import { Form } from './screen/Form/Form';
import { Home } from './screen/Home/Home';
import { StackNavigator } from 'react-navigation';

const routers = {
    Home: {
        screen: Home,
    },
    Form: {
        screen: Form,
    },
};
const initialRouteName = 'Home';

export { routers, initialRouteName };