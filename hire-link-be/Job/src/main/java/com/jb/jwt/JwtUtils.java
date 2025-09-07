package com.jb.jwt;

import com.jb.userDetails.CustomUserDetails;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

public class JwtUtils {

    // SECRET nên được lưu bằng biến môi trường,
    private static final String SECRET = "12345678901234567890123456789012";
    private static final long EXPIRATION_MS = 1 * 60 * 1000; // 1 ngày
//;86400000
    public static String generateToken(UserDetails userDetails) throws Exception {
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;

        JWSSigner signer = new MACSigner(SECRET);
        //Tạo JWT chứa thông tin:
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(customUserDetails.getUsername())
                .claim("id",customUserDetails.getId() )
                .claim("name",customUserDetails.getName())
                .claim("accountType", customUserDetails.getAccountType().toString())
                .claim("profileId", customUserDetails.getProfileId())
                .expirationTime(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .issueTime(new Date())
                .build();

        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader(JWSAlgorithm.HS256),
                claimsSet
        );

        signedJWT.sign(signer);

        return signedJWT.serialize();
    }

    public static String validateTokenAndGetUsername(String token) throws Exception {
        SignedJWT signedJWT = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(SECRET);
        if (signedJWT.verify(verifier)) {
            Date expiration = signedJWT.getJWTClaimsSet().getExpirationTime();
            if (expiration.after(new Date())) {
                return signedJWT.getJWTClaimsSet().getSubject();
            }
        }
        return null;
    }


}

