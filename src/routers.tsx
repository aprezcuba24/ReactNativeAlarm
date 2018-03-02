import { Form } from './screen/Form/Form';
import { Home } from './screen/Home/Home';

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