/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

window.friendlyPix = window.friendlyPix || {};

/**
 * Handles the user auth flows and updating the UI depending on the auth state.
 */
friendlyPix.Auth = class {

  /**
   * Returns a Promise that completes when auth is ready.
   * @return Promise
   */
  get waitForAuth() {
    return this._waitForAuthPromiseResolver.promise();
  }

  /**
   * Initializes Friendly Pix's auth.
   * Binds the auth related UI components and handles the auth flow.
   * @constructor
   */
  constructor() {
    // Firebase SDK
    this.database = firebase.database();
    this.auth = firebase.auth();
    this._waitForAuthPromiseResolver = new $.Deferred();

    $(document).ready(() => {
      // Pointers to DOM Elements
      const signedInUserContainer = $('.fp-signed-in-user-container');
      this.signedInUserAvatar = $('.fp-avatar', signedInUserContainer);
      this.signedInUsername = $('.fp-username', signedInUserContainer);
      this.signOutButton = $('.fp-sign-out');
      this.deleteAccountButton = $('.fp-delete-account');
      this.signedOutOnlyElements = $('.fp-signed-out-only');
      this.signedInOnlyElements = $('.fp-signed-in-only');
      this.usernameLink = $('.fp-usernamelink');

      // Event bindings
      this.signOutButton.click(() => this.auth.signOut());
      this.deleteAccountButton.click(() => this.deleteAccount());
      this.signedInOnlyElements.hide();
    });

    // register a callback with firebase auth
    // this handles (login or account creation) AND logout

    // aka setting an observer on the auth object
    this.auth.onAuthStateChanged(user => this.onAuthStateChanged(user));
  }

  /**
   * Displays the signed-in user information in the UI or hides it and displays the
   * "Sign-In" button if the user isn't signed-in.
   */
  onAuthStateChanged(user) {
    if (window.friendlyPix.router) {
      window.friendlyPix.router.reloadPage();
    }
    this._waitForAuthPromiseResolver.resolve();
    $(document).ready(() => {
      if (!user) {
        this.signedOutOnlyElements.show();
        this.signedInOnlyElements.hide();
        this.userId = null;
        this.signedInUserAvatar.css('background-image', '');
        firebaseUi.start('#firebaseui-auth-container', uiConfig);
      } else {
        this.signedOutOnlyElements.hide();
        this.signedInOnlyElements.show();
        this.userId = user.uid;
        this.signedInUserAvatar.css('background-image',
            `url("${user.photoURL || '/images/silhouette.jpg'}")`);
        this.signedInUsername.text(user.displayName || 'Anonymous');
        this.usernameLink.attr('href', `/user/${user.uid}`);
        friendlyPix.firebase.saveUserData(user.photoURL, user.displayName);
      }
    });
  }

  deleteAccount() {
    // https://firebase.google.com/docs/auth/web/manage-users
    this.auth.currentUser.delete().then(() => {
      window.alert('Account deleted');
    }).catch(error => {
      if (error.code === 'auth/requires-recent-login') {
        window.alert(
          'You need to have recently signed-in to delete your account.\n' +
            'Please sign-in and try again.');
        this.auth.signOut();
      }
    });
  };
};

friendlyPix.auth = new friendlyPix.Auth();
