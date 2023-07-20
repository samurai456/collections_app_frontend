import 'bootstrap/dist/css/bootstrap.min.css'
import { AdminPanel } from './components/adminPanel/adminPanel'
import { HeaderFrame } from './components/header/headerFrame'
import { UserCollections } from './components/userCollections/userCollections'
import { Collection } from './components/collection/collection'
import { SignIn } from './components/signIn/signIn'
import { SignUp } from './components/signUp/signUp'
import { Main } from './components/main/main'
import { Routes, Route } from 'react-router-dom'
import { ModalProvider } from './contexts/modalContext'
import { ToastProvider } from './contexts/toastContext'
import { PermissionProvider } from './contexts/permissionContext'
import { ThemeProvider } from './contexts/themeContext'
import { CheckPermission } from './components/checkPermission/checkPermission'
import { CreateItem } from './components/createItem/createItem'
import { Item } from './components/item/item'
import { ItemsByTag } from './components/itemsByTag/itemsByTag'
import { EditCollection } from './components/editCollection/editCollection'
import { CreateCollection } from './components/createCollection/createCollection'
import { EditItem } from './components/editItem/editItem'
import { RequestProvider } from './contexts/requestContext'
import { LangProvider } from './contexts/langContext'
import { SearchResults } from './components/searchResults/searchResults'

function App(){
  
  return(
    <div>
      <PermissionProvider>
        <RequestProvider>
          <ThemeProvider>
            <LangProvider>
              <ToastProvider>
                <ModalProvider>
                  <Routes>
                    <Route path="/" element={ 
                      <HeaderFrame>
                        <Main /> 
                      </HeaderFrame>
                    } />
                    <Route path="/sign-up" element={ <SignUp /> } />
                    <Route path="/sign-in" element={ <SignIn /> } />
                    <Route path="/user-collections/:authorId" element={ 
                      <HeaderFrame>
                        <UserCollections />
                      </HeaderFrame> 
                    } />
                    <Route path="/collection/:collectionId" element={ 
                      <HeaderFrame>
                        <Collection />
                      </HeaderFrame> 
                    } />
                    <Route path="/edit-collection/:collectionId" element={
                      <CheckPermission permit="normal">
                        <HeaderFrame>
                          <EditCollection />
                        </HeaderFrame> 
                      </CheckPermission>
                    } />
                    <Route path="/edit-item/:itemId" element={ 
                      <CheckPermission permit="normal">
                        <HeaderFrame>
                          <EditItem />
                        </HeaderFrame> 
                      </CheckPermission>
                    } />
                    <Route path="/create-item/:collectionId" element={ 
                      <CheckPermission permit="normal">
                        <HeaderFrame>
                          <CreateItem />
                        </HeaderFrame> 
                      </CheckPermission>
                    } />
                    <Route path="/item/:itemId" element={ 
                      <HeaderFrame>
                        <Item />
                      </HeaderFrame> 
                    } />
                    <Route path="/create-collection/:authorId" element={ 
                      <CheckPermission permit="normal">
                        <HeaderFrame>
                          <CreateCollection />
                        </HeaderFrame>
                      </CheckPermission> 
                    } />
                    <Route path="/admin-panel" element={ 
                      <CheckPermission permit="admin">
                        <AdminPanel /> 
                      </CheckPermission>
                    } />
                    <Route path="/items-by-tag/:tagId" element={ 
                      <HeaderFrame>
                        <ItemsByTag />
                      </HeaderFrame> 
                    } />
                    <Route path="/search/:searchingFor" element={ 
                      <HeaderFrame>
                        <SearchResults />
                      </HeaderFrame> 
                    } />
                  </Routes>
                </ModalProvider>
              </ToastProvider>
            </LangProvider>
          </ThemeProvider>
        </RequestProvider>
      </PermissionProvider>
    </div>
  ) 
}

export default App