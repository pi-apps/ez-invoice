import styled from "styled-components";

interface Props {
  errors?: any;
  name?: any;
}

function ErrorMessages({ errors, name }: Props) {
  const logerror = errors[name];
  return <ErrorMess>{logerror && logerror.message}</ErrorMess>;
}
const ErrorMess = styled.div`
  color: #ff592c;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1;
  font-family: "Marcellus", serif;
`;
export default ErrorMessages;
