
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.conf.urls.static import static
from django.conf import settings
from administration import auditTrail
from .views import *
from administration.menuMaster.models import Menu_Master

appName = settings.APP_NAME

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', loginPage, name="loginPage" ),
    path(appName +'/', loginPage, name="loginPage" ),
    path('home', home, name='home'),
    path(appName +'/changeOrg/', changeOrg, name='changeOrg'),
    path(appName +'/', loginPage, name="loginPage" ),
    path(appName +'/loginPage/', loginPage, name="loginPage" ),
    path(appName + '/logOut/', logOut, name="logOut" ),
    path(appName +'/homePage/', homePage, name="homePage" ),
    path(appName +'/getUserName/', getUserName, name="getUserName" ),
    path(appName +'/userAccessAPI/', userAccessAPI, name="userAccessAPI" ),
    path(appName +'/listPagePendingApprovalAPI/', listPagePendingApprovalAPI, name="listPagePendingApprovalAPI" ),
    path(appName +'/get_csrf/', get_csrf, name="get_csrf" ),
    path(appName +'/bulkMenuCreate/', bulkMenuCreate, name="bulkMenuCreate" ),
    path(appName + "/auditTrail/", include(("administration"+".auditTrail.urls", appName + "/auditTrail"), namespace=appName + "/auditTrail"))
]

def getMenuList():
    try:
        ml = Menu_Master.objects.filter(is_parent=False).filter(status=True).exclude(menu_url='')
        for i in ml:
            m_url =  i.menu_url
            appFolder = i.parent_menu.app_folder
            folderSize = i.folder_size
            try:
                if "/" in i.menu_url:
                    # m_url =  i.menu_url.split("/")[0]
                    pass
                else:
                    if m_url is not None and "/" not in m_url:
                        if folderSize == 1:
                            urlpatterns.append(
                                path(appName + "/"+m_url+"/", include((m_url+".urls", appName + "/"+m_url+""), namespace=appName + "/"+m_url+""))
                            )
                            urlpatterns.append(
                                path(appName + "/"+m_url+"s/", include((m_url+".urls", appName + "/"+m_url+""), namespace=appName + "/"+m_url+"s"))
                            )
                        else:
                            urlpatterns.append(
                                path(appName + "/"+m_url+"/", include((appFolder+"."+m_url+".urls", appName + "/"+m_url+""), namespace=appName + "/"+m_url+""))
                            )
                            urlpatterns.append(
                                path(appName + "/"+m_url+"s/", include((appFolder+"."+m_url+".urls", appName + "/"+m_url+""), namespace=appName + "/"+m_url+"s"))
                            )

            except Exception as e:
                print(e)
    except Exception as e:
        print(e)

getMenuList()


urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
