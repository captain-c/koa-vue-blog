
/**
 * 
 * @param {Number} type 1. 登录 2. 注册 
 */
function authRule(type = 1) {
  const rule = {
    name: [
      { required: true, message: `请输入用户名${ type === 1 ? '或者邮箱' : ''}`, trigger: 'blur' },
      { min: 6, message: '至少6个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
  };
  if (type === 2) {
    Object.assign(rule, {
      email: [
        { required: true, message: `请输入邮箱`, trigger: 'blur' },
        { pattern: EMAIL_REG, message: '请输入有效的邮箱' }
      ],
      confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' }
      ]
    });
  }
  
  return rule;
}