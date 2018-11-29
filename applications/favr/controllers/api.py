import datetime

@auth.requires_signature()
def add_post():
    post_id = db.post.insert(
        post_title=request.vars.post_title,
        post_content=request.vars.post_content,
    )
    # We return the id of the new post, so we can insert it along all the others.
    return response.json(dict(post_id=post_id))


# @auth.requires_signature()
def addFavr():
    favrId = db.favr.insert(
        title=request.vars.title,
        details=request.vars.details,
        pickupLocation=request.vars.pickupLocation,
        dropoffLocation=request.vars.dropoffLocation,
        expirationTime=datetime.datetime.utcfromtimestamp(float(request.vars.expirationTime)/1000.0),
        requestAmount=request.vars.requestAmount
    )
    return response.json(dict(favrId=favrId))

def getFavr():
    results = []
    if auth.user is not None:
        if request.vars.setCode == 'feedFavr':
            print('qqqqqqqq')
            rows = db(db.favr.REFrequestedBy == auth.user.email and
                      db.favr.isComplete == False
                      ).select(
                        db.favr.ALL, orderby=db.favr.requestTime)
            print('here')
        elif request.vars.setCode == 'myAccepted':
            rows = db(db.favr.REFrequestedBy != auth.user.email and
                      db.favr.isComplete == False and
                      db.favr.REFfulfilledBy == auth.user.email).select(
                        db.favr.ALL, orderby=db.favr.requestTime)
        elif request.vars.setCode == 'myRequested':
            rows = db(
                db.favr.REFrequestedBy == auth.user.email and
                db.favr.isComplete == False).select(
                  db.favr.ALL, orderby=db.favr.requestTime)
    else:
        rows = db(db.favr.isComplete == False).select(db.favr.ALL, orderby=db.favr.requestTime)

    if rows is not None:
        for row in rows:
            print(row)
            REFrequestedByRow = db(db.auth_user.email == row.REFrequestedBy).select(
                db.auth_user.first_name, db.auth_user.last_name).first()
            # error here
            print(REFrequestedByRow)
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
            REFfulfilledByRow = db(db.auth_user.email == row.REFrequestedBy).select(
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
                    expirationTime=row.expirationTime,
                    startTime=row.fulfillerStartTime,
                    REFrequestedBy=REFrequestedBy,
                    REFfulfilledBy=REFfulfilledBy,
                    requestTime=row.requestTime,
                    requestAmount=row.requestAmount,
                    isComplete=row.isComplete,
                )
            )
    return response.json(dict(favrSet=results))

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
    

