import { Store } from 'redux';
import { CORS_REDUX_KEY, CORS_ADDITIONAL_PATHS } from '../constants/constants';
import { CorsAppState } from '../redux/cors/cors-reducer';

export class CorsActions {
    protected additionalPaths: string[] = CORS_ADDITIONAL_PATHS;
    protected prefix: string = CORS_REDUX_KEY;
    constructor(
        protected store: Store<CorsAppState>
    ) { }
}
