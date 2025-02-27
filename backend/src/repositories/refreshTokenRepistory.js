const RefreshTokenModel = require('../models/refreshToken');

class RefreshTokenRepository {
  static async createRefreshToken(token, userId, expiresAt, metadata = {}) {
    return await RefreshTokenModel.create({
      token,
      user: userId,
      expiresAt,
      ...metadata,
    });
  }

  static async findRefreshToken(token) {
    return await RefreshTokenModel.findOne({ token });
  }

  static async deleteRefreshToken(token) {
    return await RefreshTokenModel.deleteOne({ token });
  }

  static async deleteAllRefreshTokensForUser(userId) {
    return await RefreshTokenModel.deleteMany({ user: userId });
  }
}

module.exports = RefreshTokenRepository;
