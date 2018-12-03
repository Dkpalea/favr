# Define your tables below (or better in another model file) for example
#
# >>> db.define_table('mytable', Field('myfield', 'string'))
#
# Fields can be 'string','text','password','integer','double','boolean'
#       'date','time','datetime','blob','upload', 'reference TABLENAME'
# There is an implicit 'id integer autoincrement' field
# Consult manual for more options, validators, etc.




# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)


import datetime

def get_user_email():
    return None if auth.user is None else auth.user.email

def get_user_name():
    return None if auth.user is None else ("" + auth.user.first_name + auth.user.last_name)

def get_current_time():
    return datetime.datetime.utcnow()

db.define_table('post',
                Field('post_author', default=get_user_email()),
                Field('post_title'),
                Field('post_content', 'text'),
                Field('post_time', 'datetime', default=get_current_time()),
                )

db.define_table('favr',
                Field('title'),
                Field('details'),
                Field('pickupLocation'),
                Field('dropoffLocation'),
                Field('expirationTime', 'datetime'),
                Field('fulfillerStartTime', 'datetime'),
                Field('REFrequestedBy', default=get_user_email()),
                Field('REFfulfilledBy'),
                Field('requestTime', 'datetime', default=get_current_time()),
                Field('requestAmount', 'integer', default=0),
                Field('isComplete', 'boolean', default=False)
                )

db.define_table('profile',
                Field('profile_symbol'),
                Field('user_email', default=get_user_email()),
                Field('user_name', default=get_user_name())
                )

# db.favr.requestAmount.requires = IS_INT_IN_RANGE(-1e100, 1e100)

db.define_table('test',
                Field('title'),
                Field('details'),
                Field('pickupLocation'),
                Field('dropoffLocation'),
                Field('expirationTime', 'datetime'),
                Field('fulfillerStartTime', 'datetime'),
                Field('REFrequestedBy', default=get_user_email()),
                Field('REFfulfilledBy'),
                Field('requestTime', 'datetime', default=get_current_time()),
                Field('requestAmount', 'integer', default=0),
                Field('isComplete', 'boolean', default=False)
                )

# Thumbs
db.define_table('thumb',
                Field('user_email'), # The user who thumbed, easier to just write the email here.
                Field('post_id', 'reference post'), # The thumbed post
                Field('thumb_state'), # This can be 'u' for up or 'd' for down, or None for... None.
                )
