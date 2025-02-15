from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-s0ca5g9i6%pd17587wn1zfi#tqoda1(x3xm$9e321f+ovm5+ql'

DEBUG = True

ALLOWED_HOSTS = ['*']

APP_NAME = "common-app"

AUTH_USER_MODEL = 'userMaster.User'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'sslserver',
    'frontend',
    'auditlog',
    'administration.userMaster',
    'administration.menuMaster',
    'administration.roleMaster',
    'administration.processMaster',
    'administration.auditTrail',
    'administration.countryMaster',
    'administration.organisation',
    'administration.businessLine',
    'administration.departmentMaster',
    'administration.locationMaster',
    'administration.seriesMaster',
    'administration.statusMaster',
    'administration.configuration',
    'administration.stateMaster',
    'salesModule.prospect',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

if DEBUG is False:
    REST_FRAMEWORK = {
        'DEFAULT_RENDERER_CLASSES': [
            'rest_framework.renderers.JSONRenderer',
        ],

    }

SESSION_EXPIRE_SECONDS = 1800       # 1 hour

SESSION_EXPIRE_AFTER_LAST_ACTIVITY = True

SESSION_EXPIRE_AFTER_LAST_ACTIVITY_GRACE_PERIOD = 1

SESSION_EXPIRE_AT_BROWSER_CLOSE=True

SESSION_TIMEOUT_REDIRECT = '/'
SESSION_COOKIE_HTTPONLY = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_NAME = "csrftoken"
CSRF_COOKIE_HTTPONLY = True

CORS_EXPOSE_HEADERS = ["Content-Type", "X-CSRFToken"]
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'appRoot.urls'

ROOT_URLCONF = 'appRoot.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [(BASE_DIR / './frontend'),(BASE_DIR / './static')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'appRoot.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'lab_managment_system',
#         'USER': 'lms_admin',
#         'PASSWORD': 'Happy2024',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, './frontend/build/static'),os.path.join(BASE_DIR,"./static")]
STATIC_ROOT = BASE_DIR / "./static_cdn" / "./static_root"
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,'./media/')


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

