
import React from 'react';
import { render } from 'react-dom';
import Playground from 'react-playground-kit';
import * as module from './sampleModule';

render(<Playground module={module}/>, document.getElementById('app'));