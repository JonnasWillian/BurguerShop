import { NativeBaseProvider, StatusBar } from 'native-base';
import { TEMAS } from './styles/style';

import Routes from './routes';

export default function Index() {
  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.blue[800]} />
      <Routes />
    </NativeBaseProvider>
  );
}
