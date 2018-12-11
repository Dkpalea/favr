# TODO: Remove cross origin privileges for production
import datetime
epoch = datetime.datetime.utcfromtimestamp(0)

#TODO: security decorators
# @auth.requires_signature()
def addFavr():
    # Allow cross origin requests (to test from react)
    if request.env.http_origin:
        response.headers['Access-Control-Allow-Origin'] = request.env.http_origin
    if auth.user is not None:
        print('right here');

        if (request.vars.title != '' and
            request.vars.details != '' and
            request.vars.pickupLocation != '' and
            request.vars.dropoffLocation != '' # and
            # request.vars.expirationTime and
            # int(request.vars.requestAmount) >= 0 and
            # int(request.vars.requestAmount) % 1 == 0
            ):
            favrId = db.favr.insert(
                title=request.vars.title,
                details=request.vars.details,
                pickupLocation=request.vars.pickupLocation,
                dropoffLocation=request.vars.dropoffLocation,
                expirationTime=datetime.datetime.utcfromtimestamp(float(request.vars.expirationTime)/1000.0),
                requestAmount=int(request.vars.requestAmount)
            )
            userRow = db(db.auth_user.email == auth.user.email).select().first()
            return response.json(dict(message="success", favrId=favrId, firstName=userRow.first_name, lastName=userRow.last_name))
    return response.json(dict(message='error'))

def removeFavr():
    # Allow cross origin requests (to test from react)
    if request.env.http_origin:
        response.headers['Access-Control-Allow-Origin'] = request.env.http_origin
    if auth.user is not None:
        row = db(db.favr.id == request.vars.favrId).select().first()
        if row is not None and row.REFrequestedBy == auth.user.email:
            print(row)
            print('yellow')
            db(db.favr.id == request.vars.favrId).delete()
            print('here')
            return response.json(dict(message='success'))
    return response.json(dict(message='error'))

def cancelAcceptedFavr():
    # Allow cross origin requests (to test from react)
    if request.env.http_origin:
        response.headers['Access-Control-Allow-Origin'] = request.env.http_origin
    if auth.user is not None:
        row = db(db.favr.id == request.vars.favrId).select().first()
        if row is not None and row.REFfulfilledBy == auth.user.email:
            row.update_record(
                REFfulfilledBy=None
            )
            return response.json(dict(message='success'))
    return response.json(dict(message='error'))

def acceptFavr():
    # Allow cross origin requests (to test from react)
    if request.env.http_origin:
        response.headers['Access-Control-Allow-Origin'] = request.env.http_origin
    if auth.user is not None:
        row = db(db.favr.id == request.vars.favrId).select().first()
        if row is not None and row.REFfulfilledBy is None:
            row.update_record(
                REFfulfilledBy=auth.user.email
            )
            userRow = db(db.auth_user.email == auth.user.email).select().first()
            return response.json(dict(message='success', firstName=userRow.first_name, lastName=userRow.last_name))
    return response.json(dict(message='error'))

def completeFavr():
    # Allow cross origin requests (to test from react)
    if request.env.http_origin:
        response.headers['Access-Control-Allow-Origin'] = request.env.http_origin

    row = db(db.favr.id == request.vars.favrId).select().first()
    if row is not None:
        present = datetime.datetime.now()
        if present < row.expirationTime or auth.user.email == row.REFrequestedBy:
            row.update_record(
                isComplete='T'
            )
            return response.json(dict(message='success'))
    return response.json(dict(message='error'))

def updateFavr():
    # Allow cross origin requests (to test from react)
    if request.env.http_origin:
        response.headers['Access-Control-Allow-Origin'] = request.env.http_origin
    if auth.user is not None:
        row = db(db.favr.id == request.vars.favrId).select().first()
        if row is not None and row.REFrequestedBy == auth.user.email:
            row.update_record(
                title=request.vars.title,
                requestAmount=request.vars.requestAmount,
                pickupLocation=request.vars.pickupLocation,
                dropoffLocation=request.vars.dropoffLocation,
                expirationTime=datetime.datetime.utcfromtimestamp(float(request.vars.expirationTime)/1000.0),
                details=request.vars.details,
            )
            return response.json(dict(message='success'))
    return response.json(dict(message='error'))

def getFavr():
    # Allow cross origin requests (to test from react)
    if request.env.http_origin:
        response.headers['Access-Control-Allow-Origin'] = request.env.http_origin
    results = []
    if auth.user is not None:
        if request.vars.setCode == 'feedFavr':
            # db.favr.REFrequestedBy == auth.user.email and
            # print(auth.user.email)
            rows = db(db.favr.isComplete == False
                      ).select(
                        db.favr.ALL, orderby=~db.favr.requestTime)
        elif request.vars.setCode == 'myAccepted':
            rows = db(db.favr.REFrequestedBy != auth.user.email and
                      db.favr.isComplete == False and
                      db.favr.REFfulfilledBy == auth.user.email).select(
                        db.favr.ALL, orderby=~db.favr.requestTime)
        elif request.vars.setCode == 'myRequested':
            # Weird query... didn't work properly with just first and second condition so
            #   I added a third (which should return an empty set, but instead returns
            #   the correct set, so I just left it... Took hours to stubmle across!!)
            rows = db(db.favr.REFrequestedBy == auth.user.email and
                db.favr.isComplete == 'F' and
                db.favr.REFrequestedBy != auth.user.email).select(
                  db.favr.ALL, orderby=~db.favr.requestTime)
        else:
            rows = db(db.favr.isComplete == 'F').select(db.favr.ALL, orderby=~db.favr.requestTime)
    else:
        rows = db(db.favr.isComplete == 'F').select(db.favr.ALL, orderby=~db.favr.requestTime)

    #print(rows)
    if rows is not None:
        for row in rows:
            REFrequestedByRow = db(db.auth_user.email == row.REFrequestedBy).select(
                db.auth_user.first_name, db.auth_user.last_name).first()
            REFrequestedBy = dict(
                email = row.REFrequestedBy,
                firstName = REFrequestedByRow.first_name,
                lastName = REFrequestedByRow.last_name,
            )
            REFfulfilledBy = dict(
                email=row.REFfulfilledBy,
                firstName=None,
                lastName=None,
            )
            REFfulfilledByRow = db(db.auth_user.email == row.REFfulfilledBy).select(
                db.auth_user.first_name, db.auth_user.last_name).first()
            if REFfulfilledByRow is not None:
                REFfulfilledBy['firstName'] = REFfulfilledByRow.first_name
                REFfulfilledBy['lastName'] = REFfulfilledByRow.last_name
            results.append(
                dict(
                    favrId=row.id,
                    isShowingDetails=False,
                    title=row.title,
                    details=row.details,
                    pickupLocation=row.pickupLocation,
                    dropoffLocation=row.dropoffLocation,
                    expirationTime=datetime_to_milliseconds(row.expirationTime),
                    startTime=datetime_to_milliseconds(row.fulfillerStartTime),
                    REFrequestedBy=REFrequestedBy,
                    REFfulfilledBy=REFfulfilledBy,
                    requestTime=datetime_to_milliseconds(row.requestTime),
                    requestAmount=row.requestAmount,
                    isComplete=row.isComplete,
                )
            )
            #print(results)
    return response.json(dict(favrSet=results))

def datetime_to_milliseconds(dt):
    if dt is None:
        return None
    return (dt - epoch).total_seconds() * 1000.0

def get_post_list():
    results = []
    if auth.user is None:
        # Not logged in.
        rows = db().select(db.post.ALL, orderby=~db.post.post_time)
        for row in rows:
            results.append(dict(
                id=row.id,
                post_title=row.post_title,
                post_content=row.post_content,
                post_author=row.post_author,
                thumb = None,
            ))
    else:
        # Logged in.
        rows = db().select(db.post.ALL, db.thumb.ALL,
                            left=[
                                db.thumb.on((db.thumb.post_id == db.post.id) & (db.thumb.user_email == auth.user.email)),
                            ],
                            orderby=~db.post.post_time)
        for row in rows:
            results.append(dict(
                id=row.post.id,
                post_title=row.post.post_title,
                post_content=row.post.post_content,
                post_author=row.post.post_author,
                thumb = None if row.thumb.id is None else row.thumb.thumb_state,
            ))
    # For homogeneity, we always return a dictionary.
    return response.json(dict(post_list=results))

@auth.requires_signature()
def get_profile_information():
    results = []
    #print("reach here at least?")
    #print(auth.user.email)
    if auth.user is not None:
        #print("possibly here?")
        #print(db.profile[5])
        row = db.profile(db.profile.user_email == auth.user.email)
        #print("this is the row")
        #print(row)
        results.append(dict(
            first_name = row.first_name,
            last_name = row.last_name,
            profile_symbol = row.profile_symbol,
        ))
        #print(results)
    return response.json(dict(profile_info=results))

@auth.requires_signature()
def set_profile_information():
    profile = None
    if auth.user is not None:
        profile = db.profile.update_or_insert(
            db.profile.user_email == auth.user.email,
            #profile_symbol = request.vars.characterCode
            profile_symbol_set = request.vars.symbolSet
        )
    #print(profile)
    return response.json(dict(profile_info=profile))



    

