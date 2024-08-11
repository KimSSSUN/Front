import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

// 함수형 컴포넌트의 반환 타입을 명시할 수 있습니다.
const App: React.FC = () => {
  // 상태 변수에 타입을 명시합니다.
  const [message, setMessage] = useState<string>('Loading...');
  const [loading, setLoading] = useState<boolean>(true);

  // 비동기 함수의 반환 타입을 명시합니다. 여기서는 void입니다.
  const fetchMessage = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('http://10.0.2.2:8080/hello'); // IP 주소로 변경
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage('Failed to fetch message');
    } finally {
      setLoading(false);
    }
  };

  // useEffect의 빈 배열인 두 번째 인수는 의존성을 명시합니다.
  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.text}>{message}</Text>
      )}
      <Button title="Refresh" onPress={fetchMessage} />
    </SafeAreaView>
  );
};

// StyleSheet의 객체에 대한 타입을 지정할 필요는 없지만, StyleSheet.create를 사용하여 스타일 객체를 생성합니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;

