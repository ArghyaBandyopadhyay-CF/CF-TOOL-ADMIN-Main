// Pages
import { Home } from './pages'
import { Suspense } from 'react'
// Icons
import DescriptionIcon from '@mui/icons-material/Description';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SearchIcon from '@mui/icons-material/Search'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReportIcon from '@mui/icons-material/Report';
import HomeIcon from '@mui/icons-material/Home';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BusinessIcon from '@mui/icons-material/Business'; // Added for Org
import PinchIcon from '@mui/icons-material/Pinch';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';// Admin Components
import SEO_form_List from './components/SEO_form/SEO_form_List'
import Add_SEO_form from './components/SEO_form/Add_SEO_form'
import Edit_SEO_form from './components/SEO_form/Edit_SEO_form'
import CreateDept from './components/Department/CreateDept';

import Admins from './components/Users/ListUser'
import AddRisk from './components/Risks/AddRisk';
import BulkRisk from './components/Risks/BulkRisk';
import EditRisks from './components/Risks/EditRisks';
import CreateUser from './components/Users/CreateUser';
import ListUsers from './components/Users/ListUser';
import ListDept from './components/Department/ListDept';
import ListOrg from './components/Organization/ListOrg';
import CreateOrg from './components/Organization/CreateOrg';

import GapList from './components/GapQuestion/GapList';
import AddGap from './components/GapQuestion/AddGap';
import BulkGap from './components/GapQuestion/BulkGap';
import EditGap from './components/GapQuestion/EditGap';
import RisksLists from './components/Risks/RiksLists';

import BulkUser from './components/Users/BulkUser'
import RootBulkRisk from './components/Risks/RootBulkRisk'
import RootRisksLists from './components/Risks/RootRiskList'
import VendorList from './components/Vendors/VendorList'
import VendorCreate from './components/Vendors/VendorCreate'

import ListOfLogs from './components/Logs/ListOfLogs'

import BlogImages from './components/Blogs/BlogsImage';
import BlogContent from './components/Blogs/BlogContent';
import BlogContentAdd from './components/Blogs/BlogContentAdd';
import BlogContentEdit from './components/Blogs/BlogContentEdit';
import BlogCat from './components/Blogs/BlogCat';

import TrustCentreAdmin from './components/TrustCentre/TrustCentreAdmin';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import ControlOwnershipAdmin from './components/ControlOwnership/ControlOwnerAdmin';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default {
  items: [
    {
      path: '/',
      name: 'Home',
      type: 'link',
      icon: HomeIcon,
      component: Home,
      roles: ['root', 'super_admin']
    },

      {
      path: '/logs',
      name: 'Activities',
      type: 'link',
      icon: ModeEditOutlineIcon,
      component: ListOfLogs,
      roles: [ 'super_admin']
    },
        {
      path: '/blogs',
      name: 'Blogs',
      type: 'submenu',
      icon: DescriptionIcon,
      roles: ['super_admin'],
      children: [
        {
          path: '/images',
          name: 'Blog Image',
          component: BlogImages
        },
        {
          path: '/content',
          name: 'Blog Content List',
          component: BlogContent
        },
        {
          path: '/content/add',
          name: 'Create Blog Post',
          component: BlogContentAdd
        },
        {
          path: '/content/edit/:id',
          name: 'Edit Blog Post',
          component: BlogContentEdit,
          hideFromMenu: true
        },
          {
          path: '/category',
          name: 'Category',
          component: BlogCat,
          }
      ]
    },
    {
      path: '/departments',
      name: 'Departments',
      type: 'submenu',
      icon: AssuredWorkloadIcon,
      badge: {
        type: 'primary',
        value: '1'
      },
      roles: ['root'],
      children: [
        {
          path: '/create',
          name: 'Create Department',
          component: CreateDept
        },
        {
          path: '/list',
          name: 'List Departments',
          component: ListDept
        },
      ]
    },
    {
      path: '/gap',
      name: 'Audit Question',
      type: 'submenu',
      icon: PinchIcon,
      badge: {
        type: 'primary',
        value: '1'
      },
      roles: ['super_admin'],
      children: [
              {
          path: '/list',
          name: 'Audit Question list',
          component: GapList
        },
        {
          path: '/add',
          name: 'Add Audit Question',
          component: AddGap
        },
        {
          path: '/bulk',
          name: 'Bulk Questions Upload',
          component: BulkGap
        },
        {
          path: '/edit/:id',
          name: 'Edit Audit Question',
          component: EditGap,
          hideFromMenu: true
        },
  
      ]
    },
    {
      path: '/organizations',
      name: 'Organization',
      type: 'submenu',
      icon: BusinessIcon, // Changed icon to distinguish from Risk
      badge: {
        type: 'primary',
        value: '1'
      },
      roles: ['super_admin'],
      children: [
        {
          path: '/create',
          name: 'Create Org',
          component: CreateOrg
        },
        {
          path: '/list',
          name: 'List Org',
          component: ListOrg
        },
      ]
    },
    // {
    //   path: '/policies',
    //   name: 'Policies',
    //   type: 'submenu',
    //   icon: DescriptionIcon,
    //   badge: {
    //     type: 'primary',
    //     value: '1'
    //   },
    //   roles: ['super_admin'],
    //   children: [
    //     {
    //       path: '/add_policies',
    //       name: 'Add Policies',
    //       component: PolicyAdd,
    //     },
    //     {
    //       path: '/bulk_policies',
    //       name: 'Bulk Policies Upload',
    //       component: BulkPolicy,
    //     },
    //     {
    //       path: '/policies_edit/:id',
    //       name: 'Edit Policies',
    //       component: PolicyEdit,
    //       hideFromMenu: true 
    //     },
    //     {
    //       path: '/policies_all', 
    //       name: 'Policies List',
    //       component: PolicyList
    //     }
    //   ]
    // },
// ✅ FIX: Risk Management kept as '/risks'
    {
      path: '/risks',
      name: 'Risk',
      type: 'submenu',
      icon: ReportIcon,
      badge: {
        type: 'primary',
        value: '1'
      },
      roles: ['super_admin'],
      children: [
        {
          path: '/risk_sample/add',
          name: 'Add Risks',
          component: AddRisk
        },
        {
          path: '/risk_sample/bulk',
          name: 'Bulk Risks Upload',
          component: BulkRisk
        },
        {
          path: '/risk_sample/edit/:id',
          name: 'Edit risks',
          component: EditRisks,
          hideFromMenu: true
        },
        {
          path: '/risk_sample/list',
          name: 'Risks list',
          component: RisksLists
        }
      ]
    },
      {
      path: '/risks',
      name: 'Risk',
      type: 'submenu',
      icon: ReportIcon,
      badge: {
        type: 'primary',
        value: '1'
      },
      roles: ['root'],
      children: [
        {
          path: '/risk_sample/add',
          name: 'Add Risks',
          component: AddRisk
        },
        {
          path: '/risk_sample/root_bulk',
          name: 'Bulk Risks Upload',
          component: RootBulkRisk
        },
        {
          path: '/risk_sample/edit/:id',
          name: 'Edit risks',
          component: EditRisks,
          hideFromMenu: true
        },
        {
          path: '/risk_sample/root_list',
          name: 'Risks list',
          component: RootRisksLists
        }
      ]
    },
    // SEO 
    {
      path: '/seo_form',
      name: 'SEO',
      type: 'submenu',
      icon: SearchIcon,
      badge: {
        type: 'primary',
        value: '3'
      },
      roles: ['super_admin'],
      children: [
        {
          path: '/add',
          name: 'Add SEO Form',
          component: Add_SEO_form
        },
        {
          path: '/edit/:id',
          name: 'Edit SEO Form',
          component: Edit_SEO_form,
          hideFromMenu: true
        },
        {
          path: '/list',
          name: 'SEO Form List',
          component: SEO_form_List
        }
      ]
    },
    {
  path: '/trust-centre',
  name: 'Trust Centre',
  type: 'link',           // single page, no sub-menu needed
  icon: VerifiedUserIcon,
  component: TrustCentreAdmin,
  roles: ['root']         // only root (client admin) can manage it
},

{
  path: '/control-ownership',
  name: 'Control Ownership',
  type: 'link',
  icon: ManageAccountsIcon,
  component: ControlOwnershipAdmin,
  roles: ['root']          // only root can assign control owners
},
    {
      path: '/users',
      name: 'Users',
      type: 'submenu',
      icon: AdminPanelSettingsIcon,
      badge: {
        type: 'primary',
        value: '1'
      },
      
      roles: ['root', 'super_admin'],
      children: [
        {
          path: '/bulk_user_entries',
          name: 'Bulk Users Upload',
          component: BulkUser
        },
        {
          path: '/create',
          name: 'Create User',
          component: CreateUser
        },
        {
          path: '/list',
          name: 'Users List',
          component: ListUsers
        },
      ]
    },
    // Vendors — super_admin can only view the list (no create)
    // {
    //   path: '/vendors',
    //   name: 'Vendors',
    //   type: 'submenu',
    //   icon: SupervisorAccountIcon,
    //   badge: {
    //     type: 'primary',
    //     value: '1'
    //   },
    //   roles: ['super_admin'],
    //   children: [
    //     {
    //       path: '/list',
    //       name: 'Vendors List',
    //       component: VendorList
    //     },
    //   ]
    // },
    // Vendors — root can create and view list
    {
      path: '/vendors',
      name: 'Vendors',
      type: 'submenu',
      icon: SupervisorAccountIcon,
      badge: {
        type: 'primary',
        value: '1'
      },
      roles: ['root'],
      children: [
        {
          path: '/create',
          name: 'Create Vendor Profile',
          component: VendorCreate
        },
        {
          path: '/list',
          name: 'Vendors List',
          component: VendorList
        },
      ]
    },
  ]
}