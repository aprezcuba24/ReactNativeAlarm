import { Form } from './screen/Form';
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
    Form: {
        screen: Form,
    },
};
const initialRouteName = 'Home';

export { routers, initialRouteName };