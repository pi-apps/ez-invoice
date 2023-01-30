import get from "lodash/get";
import { DefaultTheme } from "styled-components";

const getThemeValue = (theme: DefaultTheme, path: string, fallback?: any): string =>
  get(theme, path, fallback);

export default getThemeValue;
