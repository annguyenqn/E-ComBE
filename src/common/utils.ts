import bcrypt from 'bcrypt';

export default class AppUtil {
  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  static generateHash(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  static validateHash(
    password?: string,
    hash?: string | null,
  ): Promise<boolean> {
    if (!password || !hash) {
      return Promise.resolve(false);
    }

    return bcrypt.compare(password, hash);
  }

  static getVariableName<TResult>(getVar: () => TResult): string | undefined {
    const m = /\(\)=>(.*)/.exec(
      getVar.toString().replaceAll(/(\r\n|\n|\r|\s)/gm, ''),
    );

    if (!m) {
      throw new Error(
        "The function does not contain a statement matching 'return variableName;'",
      );
    }

    const fullMemberName = m[1];

    const memberParts = fullMemberName.split('.');

    return memberParts.at(-1);
  }
}
