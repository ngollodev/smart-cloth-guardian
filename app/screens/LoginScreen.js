import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('MainApp');
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const response = await login({ email, password });
      
      if (!response.success) {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="flex-1 px-4 py-8 justify-center">
        <StyledView className="items-center mb-8">
          <StyledView className="w-16 h-16 bg-primary rounded-full items-center justify-center mb-4">
            <StyledText className="text-white text-2xl font-bold">CG</StyledText>
          </StyledView>
          <StyledText className="text-2xl font-bold text-center">Smart Cloth Guardian</StyledText>
          <StyledText className="text-muted text-center mt-1">Your intelligent clothesline protection system</StyledText>
        </StyledView>
        
        <Card className="w-full mb-6">
          <CardHeader title="Welcome Back" subtitle="Sign in to your account to continue" />
          
          <CardContent>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="youremail@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />
            
            {error ? (
              <StyledText className="text-destructive mb-4">{error}</StyledText>
            ) : null}
            
            <Button
              title={isLoading ? "Signing in..." : "Sign In"}
              onPress={handleLogin}
              disabled={isLoading}
              loading={isLoading}
              fullWidth
            />
          </CardContent>
          
          <CardFooter>
            <StyledView className="items-center">
              <StyledText className="text-muted">
                Don't have an account?{' '}
                <StyledTouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <StyledText className="text-primary font-medium">Create an account</StyledText>
                </StyledTouchableOpacity>
              </StyledText>
            </StyledView>
          </CardFooter>
        </Card>
        
        <StyledView className="items-center">
          <StyledText className="text-muted text-sm">Demo login: demo@example.com / password</StyledText>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
}

export default LoginScreen;
