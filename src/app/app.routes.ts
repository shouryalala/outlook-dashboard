import {HomeComponent} from "./pages/home/home.component";

export const appRoutes=[
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'others',
        loadChildren:'./pages/others/others.module#OthersModule',
    },
    {
        path: 'abctest',
        loadChildren:'./pages/abctest/abctest.module#AbctestModule',
    },
];