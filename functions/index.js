'use strict';

/**
 * Triggers when a user gets a new follower and sends notifications if the user has enabled them.
 * Also avoids sending multiple notifications for the same user by keeping a timestamp of sent notifications.
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'sendFollowerNotification') {
  exports.sendFollowerNotification = require('./sendFollowerNotification').default;
}

/**
 * When an image is uploaded we check if it is flagged as Adult or Violence by the Cloud Vision
 * API and if it is we blur it using ImageMagick.
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'blurOffensiveImages') {
  exports.blurOffensiveImages = require('./blurOffensiveImages').default;
}

/**
 * When an account is deleted we delete all the user data in the store as well.
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'cleanupAccount') {
  exports.cleanupAccount = require('./cleanupAccount').default;
}

/**
 * When an image is uploaded, automatically generate a thumbnail using ImageMagick.
 * After the thumbnail has been generated and uploaded to cloud storage,
 * we write the public URL to the DB.
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'generateThumbnail') {
	exports.generateThumbnail = require('./generateThumbnail').default;
}
