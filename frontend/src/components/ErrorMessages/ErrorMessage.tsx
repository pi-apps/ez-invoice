import styled from "styled-components";
import { Translate } from "react-auto-translate";

interface Props {
  errors?: any;
  name?: any;
}

function ErrorMessages({ errors, name }: Props) {
  const logerror = errors[name];
  return (
    <ErrorMess>
      {/* {logerror ? <Translate>{logerror && logerror.message}</Translate> : null} */}
      {logerror && logerror.message}
    </ErrorMess>
  );
}
const ErrorMess = styled.div`
  color: #ff592c;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1;
  margin-top: 6px;
`;
export default ErrorMessages;
