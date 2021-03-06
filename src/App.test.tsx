import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from './App';
import 'jest-canvas-mock';

const mockStore = configureMockStore();
const store = mockStore({});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      
    </Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
