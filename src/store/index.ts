import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
				{
					// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
				},
			)
		: compose;

const middlewares = [ sagaMiddleware ];

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
	middlewares.push(
		require('redux-logger').createLogger({
			logger: console,
			timestamp: true,
			diff: true,
			duration: true,
			logErrors: true,
			predicate: true,
			collapsed: true,
		}),
	);
}

const enhancer = composeEnhancers(
	applyMiddleware(...middlewares),
	// other store enhancers if any
);

export default function configStore() {
	const store = createStore(rootReducer, enhancer);
	sagaMiddleware.run(rootSaga);
	return store;
}
