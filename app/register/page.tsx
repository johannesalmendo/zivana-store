import Container from "../components/Container";
import FormWarp from "../components/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = () => {
    return ( 
        <Container>
            <FormWarp>
                <RegisterForm/>
            </FormWarp>
        </Container>
     );
}
 
export default Register;