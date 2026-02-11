// src/utils/hash.ts
import * as Crypto from "expo-crypto";

export async function hashPassword(password) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}
