import * as bcrypt from 'bcrypt';

export class HashHelper {
  /**
   * Encrypts plain string
   * @param str {string}
   * @returns Promise<string> Returns encrypted
   */
  public static async encrypt(str: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(str, salt);
  }

  /**
   * Compares encrypted and provided string
   * @param plain {string}
   * @param encrypted {string}
   * @returns Promise<boolean> Returns Boolean if provided string and encrypted string are equal
   */
  public static async compare(plain: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(plain, encrypted);
  }
}
