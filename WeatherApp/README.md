# MywayWeather

## React Native project

Nomad coder 의 '왕초보를 위한 React Native 101' 강의를 들으며 진행한 프로젝트 입니다.

# `git clone` 이후 해야할 것

## 내부 터미널

- npm 설치
  - `npm install`
- 위치 확인 API
  - `npx expo install expo-location`
- `npm install --global @expo/ngrok@^4.1.0`

## 외부 터미널

- watchman 설치
  ```
  brew update
  brew install watchman
  ```

## API KEY

`.env` 파일로 openWeather API KEY 필요 (무료)

```
EXPO_PUBLIC_API_KEY="[API KEY]"
```

형식으로 만들 것
