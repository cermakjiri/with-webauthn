import { Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { SnackbarkContainer } from './SnackbarProvider.styles';

export const SnackbarProvider = () => {
    return <SnackbarkContainer position='bottom-left' transition={Slide} />;
};
