import { Outlet } from 'react-router-dom'
import { useShellController } from '../controller/useShellController'
import { ShellView } from '../view/Shell.view'

export function ShellLayout() {
  const { navRef, viewModel } = useShellController()

  return (
    <div ref={navRef}>
      <ShellView {...viewModel}>
        <Outlet />
      </ShellView>
    </div>
  )
}
