import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../features/auth/page/LoginPage'
import { ProtectedRoute } from '../features/auth/page/ProtectedRoute'
import { ClientDetailPage } from '../features/client-detail/page/ClientDetailPage'
import { EntityListPage } from '../features/entity-list/page/EntityListPage'
import { TabProvider } from '../features/shell/context/TabProvider'
import { ShellLayout } from '../features/shell/page/ShellLayout'
import { getEntityByPath, MENU_GROUPS } from '../shared/config/navigation'

function WorkspaceRoutes() {
  const entityRoutes = MENU_GROUPS.flatMap((group) => group.items)

  return (
    <Routes>
      <Route element={<ShellLayout />}>
        <Route index element={<Navigate to="/clients" replace />} />
        <Route path="/clients/:id" element={<ClientDetailPage />} />
        {entityRoutes.map((item) => {
          const entity = getEntityByPath(item.path)
          if (!entity) return null
          return (
            <Route
              key={item.id}
              path={item.path}
              element={<EntityListPage entity={entity} />}
            />
          )
        })}
      </Route>
    </Routes>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <TabProvider>
              <WorkspaceRoutes />
            </TabProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
