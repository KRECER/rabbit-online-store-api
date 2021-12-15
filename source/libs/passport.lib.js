import GoogleStrategy from 'passport-google-oauth';
import passport from 'passport';

import {
    getGoogleClientID,
    getGoogleClientSecret,
    getGoogleCallbackURL,
} from '../helpers/env';

(() => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj.id);
    });

    //============ GOOGLE
    passport.use(
        'google',
        new GoogleStrategy.OAuth2Strategy(
            {
                clientID: getGoogleClientID(),
                clientSecret: getGoogleClientSecret(),
                callbackURL: getGoogleCallbackURL(),
            },
            // eslint-disable-next-line max-params
            function (request, accessToken, refreshToken, profile, done) {
                process.nextTick(() => {
                    done(null, profile);
                });
            }
        )
    );
})();
