import { NewSchedule } from './screen/NewSchedule';
import { Settings } from './screen/Settings';
import { Home } from './screen/Home';
import { StackNavigator } from 'react-navigation';

const routers = {
    Home: {
        screen: Home,
    },
    Settings: {
        screen: Settings,
    },
    NewSchedule: {
        screen: NewSchedule,
    },
};
const initialRouteName = 'Home';

export { routers, initialRouteName };