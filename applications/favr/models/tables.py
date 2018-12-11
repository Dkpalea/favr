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
import random

def get_user_email():
    return None if auth.user is None else auth.user.email

def get_user_first():
    return None if auth.user is None else auth.user.first_name

def get_user_last():
    return None if auth.user is None else auth.user.last_name

def random_symbol():
    #"\ud83d\ude01"
    """ JAVASCRIPT ENCODING CHANGES I SWEAR
    partial = '\ud83d\ude'
    toHex = random.randint(0, 78)
    #final = partial + '{0:02x}'.format(int(toHex))
    final = "".join([partial, '{0:02x}'.format(int(toHex))])
    final = final.replace('\\\\', '\\')
    print(final)
    """
    unicodeCharArray = []
    unicodeCharArray.append(u'\U0001f600')
    unicodeCharArray.append(u'\U0001f601')
    unicodeCharArray.append(u'\U0001f602')
    unicodeCharArray.append(u'\U0001f603')
    unicodeCharArray.append(u'\U0001f604')
    unicodeCharArray.append(u'\U0001f605')
    unicodeCharArray.append(u'\U0001f606')
    unicodeCharArray.append(u'\U0001f607')
    unicodeCharArray.append(u'\U0001f608')
    unicodeCharArray.append(u'\U0001f609')
    unicodeCharArray.append(u'\U0001f60A')
    unicodeCharArray.append(u'\U0001f60B')
    unicodeCharArray.append(u'\U0001f60C')
    unicodeCharArray.append(u'\U0001f60D')
    unicodeCharArray.append(u'\U0001f60E')
    unicodeCharArray.append(u'\U0001f60F')

    unicodeCharArray.append(u'\U0001f610')
    unicodeCharArray.append(u'\U0001f611')
    unicodeCharArray.append(u'\U0001f612')
    unicodeCharArray.append(u'\U0001f613')
    unicodeCharArray.append(u'\U0001f614')
    unicodeCharArray.append(u'\U0001f615')
    unicodeCharArray.append(u'\U0001f616')
    unicodeCharArray.append(u'\U0001f617')
    unicodeCharArray.append(u'\U0001f618')
    unicodeCharArray.append(u'\U0001f619')
    unicodeCharArray.append(u'\U0001f61A')
    unicodeCharArray.append(u'\U0001f61B')
    unicodeCharArray.append(u'\U0001f61C')
    unicodeCharArray.append(u'\U0001f61D')
    unicodeCharArray.append(u'\U0001f61E')
    unicodeCharArray.append(u'\U0001f61F')

    unicodeCharArray.append(u'\U0001f620')
    unicodeCharArray.append(u'\U0001f621')
    unicodeCharArray.append(u'\U0001f622')
    unicodeCharArray.append(u'\U0001f623')
    unicodeCharArray.append(u'\U0001f624')
    unicodeCharArray.append(u'\U0001f625')
    unicodeCharArray.append(u'\U0001f626')
    unicodeCharArray.append(u'\U0001f627')
    unicodeCharArray.append(u'\U0001f628')
    unicodeCharArray.append(u'\U0001f629')
    unicodeCharArray.append(u'\U0001f62A')
    unicodeCharArray.append(u'\U0001f62B')
    unicodeCharArray.append(u'\U0001f62C')
    unicodeCharArray.append(u'\U0001f62D')
    unicodeCharArray.append(u'\U0001f62E')
    unicodeCharArray.append(u'\U0001f62F')

    unicodeCharArray.append(u'\U0001f630')
    unicodeCharArray.append(u'\U0001f631')
    unicodeCharArray.append(u'\U0001f632')
    unicodeCharArray.append(u'\U0001f633')
    unicodeCharArray.append(u'\U0001f634')
    unicodeCharArray.append(u'\U0001f635')
    unicodeCharArray.append(u'\U0001f636')
    unicodeCharArray.append(u'\U0001f637')
    unicodeCharArray.append(u'\U0001f638')
    unicodeCharArray.append(u'\U0001f639')
    unicodeCharArray.append(u'\U0001f63A')
    unicodeCharArray.append(u'\U0001f63B')
    unicodeCharArray.append(u'\U0001f63C')
    unicodeCharArray.append(u'\U0001f63D')
    unicodeCharArray.append(u'\U0001f63E')
    unicodeCharArray.append(u'\U0001f63F')

    unicodeCharArray.append(u'\U0001f640')
    unicodeCharArray.append(u'\U0001f641')
    unicodeCharArray.append(u'\U0001f642')
    unicodeCharArray.append(u'\U0001f643')
    unicodeCharArray.append(u'\U0001f644')
    unicodeCharArray.append(u'\U0001f645')
    unicodeCharArray.append(u'\U0001f646')
    unicodeCharArray.append(u'\U0001f647')
    unicodeCharArray.append(u'\U0001f648')
    unicodeCharArray.append(u'\U0001f649')
    unicodeCharArray.append(u'\U0001f64A')
    unicodeCharArray.append(u'\U0001f64B')
    unicodeCharArray.append(u'\U0001f64C')
    unicodeCharArray.append(u'\U0001f64D')
    unicodeCharArray.append(u'\U0001f64E')
    unicodeCharArray.append(u'\U0001f64F')
    return random.choice(unicodeCharArray)

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
                Field('profile_symbol', default = random_symbol()),
                #Field('profile_symbol'),
                Field('user_email', default=get_user_email()),
                Field('first_name', default=get_user_first()),
                Field('last_name', default=get_user_last()),
                Field('profile_symbol_set', 'boolean', default=False)
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
