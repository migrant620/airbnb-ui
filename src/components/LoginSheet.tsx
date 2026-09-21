import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, type, radii, shadow } from '../tokens';
import { CloseIcon, GoogleIcon, AppleIcon } from './Icons';
export const LoginSheet = ({ onClose }: {
    onClose: () => void;
}) => (<View style={styles.overlay}>
    <TouchableOpacity style={styles.scrim} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close"/>
    <View style={styles.sheet}>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} style={styles.closeBtn}>
        <CloseIcon size={16} color={colors.ink}/>
      </TouchableOpacity>
      <Text style={type.loginTitle}>Log in or sign up</Text>
      <View style={styles.input}>
        <Text style={type.loginInput}>Phone number or email</Text>
      </View>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Continue" style={styles.continueBtn}>
        <Text style={type.loginContinue}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or</Text>
      <View style={styles.socialRow}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Continue with Google" style={styles.socialBtn}>
          <GoogleIcon size={26} color={colors.ink}/>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Continue with Apple" style={styles.socialBtn}>
          <AppleIcon size={26} color={colors.ink}/>
        </TouchableOpacity>
      </View>
    </View>
  </View>);
const styles = StyleSheet.create({
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 55 },
    scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.scrim },
    sheet: {
        position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.white,
        borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40,
    },
    closeBtn: { position: 'absolute', top: 18, right: 18, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
    input: {
        marginTop: 70, borderWidth: 1, borderColor: colors.hairline, borderRadius: 12,
        paddingHorizontal: 16, height: 52, justifyContent: 'center', backgroundColor: colors.white,
    },
    continueBtn: {
        marginTop: 16, backgroundColor: colors.reserve, borderRadius: 12, height: 52,
        alignItems: 'center', justifyContent: 'center',
    },
    orText: { textAlign: 'center', marginTop: 18, marginBottom: 16, fontSize: 16, color: colors.ink },
    socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
    socialBtn: {
        width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: colors.hairline,
        alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white,
    },
});
