import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

function getProcessXRemoteUrl(): string {
  const envUrl = (window as any).env?.SERVICES?.PROCESSX_URL;
  if (envUrl) {
    return `${envUrl.replace(/\/+$/, '')}/remoteEntry.js`;
  }
  return 'http://localhost:4201/remoteEntry.js';
}

const routes: Routes = [
  // 1. Mặc định vào Ticket
  {
    path: '',
    redirectTo: 'ticket',
    pathMatch: 'full'
  },
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
  },

  // 2. Micro-Frontend ProcessX (Quản lý quy trình & tiến trình) nạp từ remote app port 4201
  {
    path: 'processX',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: getProcessXRemoteUrl(),
      exposedModule: './ProcessXModule'
    }).then(m => m.ProcessXModule)
  },

  // 3. Hỗ trợ alias khi menu hoặc URL gọi trực tiếp không có tiền tố /processX
  {
    path: 'procedure-management',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: getProcessXRemoteUrl(),
      exposedModule: './ProcessXModule'
    }).then(m => m.ProcessXModule)
  },
  {
    path: 'process-management',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: getProcessXRemoteUrl(),
      exposedModule: './ProcessXModule'
    }).then(m => m.ProcessXModule)
  },

  // 4. Các menu phân hệ khác của IPCC Host
  { path: 'interaction', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'enterprise-package', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'monitor', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'cx-survey', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'menu-check', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'user-management', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'supervision', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'voice-config', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'score', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) },
  { path: 'social-config', loadChildren: () => import('./placeholder/placeholder.module').then(m => m.PlaceholderModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
