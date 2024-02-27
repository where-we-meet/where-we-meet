const SignInForm = ({ handleSignIn }) => {
  return (
    <form onSubmit={handleSignIn}>
      <input type="text" name="nickname" />
      <input type="password" name="password" />
      <button>Sign In</button>
    </form>
  );
};

export default SignInForm;
