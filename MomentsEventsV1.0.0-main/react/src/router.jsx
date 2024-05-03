
import {createBrowserRouter, Navigate} from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import DefaultAdminLayout from './components/DefaultAdminLayout';
import DashboardClient from './components/DashboardClient';
import GuestAdminLayout from './components/GuestAdminLayout';
import GuestLayout from './components/GuestLayout';
import AjoutCategorie from './views/Dashboard/Admin/AjoutCategorie';
import AjoutCategorieNew from './views/Dashboard/Admin/AjoutCategorieNew';
import AjoutPrestation from './views/Dashboard/Admin/AjoutPrestation';
import CategoryForm from './views/Dashboard/Admin/CategoryForm';
import CategoryFormNew from './views/Dashboard/Admin/CategoryFormNew';
import Reservation from './views/Dashboard/Reservation/Reservation';
import Notification from './views/Dashboard/Notification';
import SettingsPage from './views/Dashboard/Settings/SettingsPage';
import Prestations from './views/Dashboard/Prestations';
import Availability from './views/Dashboard/ME_Availability';
import Packs from './views/Dashboard/ME_Packs';
import ReserverPresta from './views/Dashboard/ME_ReserverPresta';
import Dashboard from './views/Dashboard/Dashboard';
import GestionCategories from './views/Dashboard/Admin/GestionCategories';
import GestionEvents from './views/Dashboard/Admin/GestionEvents';
import GestionUsers from './views/Dashboard/Admin/Users/GestionUsers';
import Home from './views/Home/Home';
import Login from './views/Dashboard/Login';
import LoginAdmin from './views/Dashboard/LoginAdmin';
import NotFound from './views/NotFound';
import Prestataire from './views/Prestataire/Prestataire';
import Prestation from './views/Prestation/Prestation';
import PrestationForm from './views/Dashboard/Admin/PrestationForm';
import Profile from './views/Dashboard/User/Profile';
import Search from './views/Rechercher/Rechercher';
import ShowPrestation from './views/Dashboard/Admin/ShowPrestation';
import Signup from './views/Signup';
import TestApiCalls from './views/Dashboard/Admin/TestApiCalls';
import TestPmt from './views/Dashboard/Admin/TestPmt';
import UserForm from './views/Dashboard/Admin/UserForm';
import Users from './views/Dashboard/Admin/Users';
import TestMail from './views/Dashboard/Admin/TestMail';
import Panier from './components/Evenement/Evenement.Panier';
import Evenement from './views/Evenement/Evenement';
import GestionPacks from './views/Dashboard/Admin/GestionPacks';
import GestionPrestations from './views/Dashboard/Admin/GestionPrestations';
import AjoutPack from './views/Dashboard/Admin/AjoutPack';
import PackForm from './views/Dashboard/Admin/PackForm';
import Favoris from './views/Favoris/favoris';
import TestMailSuivi from './views/Dashboard/Admin/TestMailSuivi';
import PaiementReussi from './views/Paiement/Paiement.success';
import PaiementAnnuler from './views/Paiement/Paiement.cancel';
import PaiementRater from './views/Paiement/Paiement.cancel';



const createPrestations = () => {
    const prestations = [];
    for (let i = 0; i < 30; i++) {
        prestations.push({
            id: i,
            titre: 'Prestation ' + i,
            categorie: 'Categorie ' + i,
            lieu: 'Lieu ' + i,
            image: 'https://source.unsplash.com/random/' + (i + 1),
            note: Math.floor(Math.random() * 5) + 1,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        });
    }
    return prestations;
}

let lstPrestations = createPrestations();

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Home />
    // },
    // {
    //     path: '/home',
    //     element: <Home />
    // },
    {
        path: '/',
        element: <Home prestations={lstPrestations}/>
    },
    {
        path: '/home',
        element: <Home prestations={lstPrestations}/>
    },
	{
        path: '/prestataire/:id',
        element: <Prestataire prestations={lstPrestations}/>
    },
    {
        path: '/rechercher',
        element: <Search/>
    },
    {
        path: '/prestation/:id',
        element: <Prestation prestations={lstPrestations}/>
    },
    {
        path: '/panier',
        element: <Evenement/>
    },
    {
        path: '/favoris',
        element: <Favoris/>
    },
    {
        path: '/paiement/success',
        element: <PaiementReussi />
    },
    {
        path: '/paiement/fail',
        element: <PaiementRater />
    },
    {
        path: '/paiement/cancel',
        element: <PaiementAnnuler />
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    },
    {
        path: '/',
        element: <DashboardClient/>,
        children: [
            {
                path: '/reservations/:tab?',
                element: <Reservation/>
            },
            {
                path: '/notifications',
                element: <Notification/>
            },
            {
                path: '/parametres',
                element: <SettingsPage/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/prestations',
                element: <Prestations/>
            },
            {
                path: '/packs',
                element: <Packs/>
            },
            {
                path: '/availabilities',
                element: <Availability/>
            },
            {
                path: '/reserverPresta',
                element: <ReserverPresta/>
            }
            // {
            //     path: '/profile',
            //     element: <Profile />
            // },
            // {
            //     path: '/users',
            //     element: <Users/>
            // },
            // {
            //     path: '/users/new',
            //     element: <UserForm key='userCreate' />
            // },
            // {
            //     path: '/users/:id',
            //     element: <UserForm key='userUpdate' />
            // },
        ]
    },
    // {
    //     path: '/admin',
    //     element: <LoginAdmin />
    // },
    {
        path: '/admin',
        element: <GuestAdminLayout />,
        children: [
            {
                path: '/admin',
                element: <LoginAdmin />
            }
        ]
    },
    {
        path: '/admin',
        element: <DefaultAdminLayout />,
        children: [
            {
                path: '/admin',
                element: <Navigate to='/admin/users' />
            },
            {
                path: '/admin/users',
                element: <GestionUsers />
            },
            {
                path: '/admin/users/new',
                element: <UserForm key='userCreate' />
            },
            {
                path: '/admin/users/:id',
                element: <UserForm key='userUpdate' />
            },
            {
                path: '/admin/events',
                element: <GestionEvents />
            },
            {
                path: '/admin/users/:id/addPrestation',
                element: <AjoutPrestation />
            },
            {
                path: '/admin/users/:id/showPrestation',
                element: <ShowPrestation />
            },
            {
                path: '/admin/prestation/:idParam',
                element: <PrestationForm />
            },
            {
                path: '/admin/packs/new',
                element: <AjoutPack />,
            },
            {
                path: '/admin/packs/:idParam',
                element: <PackForm />,
            },
            {
                path: '/admin/categories',
                element: <GestionCategories />
            },
            {
                path: '/admin/categories/new',
                element: <AjoutCategorie />
            },
            {
                path: '/admin/categories/:idParam',
                element: <CategoryForm />
            },
            // {
            //     path: '/admin/categoriesNew',
            //     element: <GestionCategoriesNew />
            // },
            {
                path: '/admin/categoriesNew/new',
                element: <AjoutCategorieNew />
            },
            {
                path: '/admin/categoriesNew/:idParam',
                element: <CategoryFormNew />
            },
            {
                path: '/admin/packsOLD',
                element: <GestionPacks />,
            },
            {
                path: '/admin/prestations',
                element: <GestionPrestations />,
            },
            {
                path: '/admin/apiCalls',
                element: <TestApiCalls />
            },
            {
                path: '/admin/testPmt',
                element: <TestPmt />
            },
            {
                path: '/admin/testMail',
                element: <TestMail />
                },
                {
                path: '/admin/testMailSuivi',
                element: <TestMailSuivi />
                }
            // {
            //     path: '/admin/filesUpload',
            //     element: <FileUpload />
            // }
        ]
    },
    // {
    //     path: '/admin',
    //     element: <LoginAdmin />
    // },
    // {
    //     path: '/admin/home',
    //     element: <LoginAdmin />
    // },
    // {
    //     path: '/admin',
    //     element: <GuestAdminLayout />,
    //     children: [
    //         {
    //             path: '/admin/login',
    //             element: <LoginAdmin />
    //         }
    //     ]
    // },
    // {
    //     path: '/admin',
    //     element: <DefaultAdminLayout />,
    //     children: [
    //         {
    //             path: '/admin',
    //             element: <Navigate to='/admin/users' />
    //         },
    //         {
    //             path: '/admin/users',
    //             element: <GestionUsers />
    //         },
    //         {
    //             path: '/admin/users/new',
    //             element: <UserForm key='userCreate' />
    //         },
    //         {
    //             path: '/admin/users/:id',
    //             element: <UserForm key='userUpdate' />
    //         },
    //         {
    //             path: '/admin/events',
    //             element: <GestionEvents />
    //         },
    //         {
    //             path: '/admin/users/:id/addPrestation',
    //             element: <AjoutPrestation />
    //         },
    //         {
    //             path: '/admin/users/:id/showPrestation',
    //             element: <ShowPrestation />
    //         },
    //         {
    //             path: '/admin/prestation/:idParam',
    //             element: <PrestationForm />
    //         }
    //     ]
    // },
    // {
    //     path: '/admin',
    //     element: <AdminLayout/>,
    //     children: [
    //         // {
    //         //     path: '/admin/dashboard',
    //         //     element: <DashboardAdmin />
    //         // },
    //         // {
    //         //     path: '/admin',
    //         //     element: <Navigate to={'/admin/users'} />
    //         // },
    //         {
    //             path: '/admin/users',
    //             element: <GestionUsers />
    //         },
    //         {
    //             path: '/admin/users/new',
    //             element: <UserForm key='userCreate' />
    //         },
    //         {
    //             path: '/admin/users/:id',
    //             element: <UserForm key='userUpdate' />
    //         },
    //         {
    //             path: '/admin/events',
    //             element: <GestionEvents />
    //         },
    //         {
    //             path: '/admin/users/:id/addPrestation',
    //             element: <AjoutPrestation />
    //         },
    //         {
    //             path: '/admin/users/:id/showPrestation',
    //             element: <ShowPrestation />
    //         },
    //         {
    //             path: '/admin/prestation/:idParam',
    //             element: <PrestationForm />
    //         }
    //     ]
    // },
    {
        path: '/*',
        element: <NotFound/>
    },
]);

export default router;
