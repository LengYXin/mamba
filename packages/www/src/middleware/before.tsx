import { Redirect } from 'umi'

export default (props: any) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
}

function useAuth(): { isLogin: any; } {
  throw new Error('Function not implemented.');
}
