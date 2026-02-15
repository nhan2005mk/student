<%-- 
    Document   : user-form.jsp
    Created on : Feb 14, 2026, 1:45:54 PM
    Author     : pc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
         <meta charset="UTF-8">
    <title>${mode == 'edit' ? 'Edit User' : 'Create User'}</title>
    <style>
        body{font-family:Arial;margin:24px}
        label{display:block;margin-top:12px}
        input,select{padding:8px;width:320px}
        .btn{padding:6px 10px;border:1px solid #999;text-decoration:none;background:#fafafa}
    </style>
</head>
<body>
<h2>${mode == 'edit' ? 'Edit User' : 'Create User'}</h2>

<c:if test="${not empty error}">
    <p style="color:red">${error}</p>
</c:if>

<form method="post" action="${pageContext.request.contextPath}/manager/users">
    <c:choose>
        <c:when test="${mode == 'edit'}">
            <input type="hidden" name="action" value="update"/>
            <input type="hidden" name="id" value="${user.id}"/>
        </c:when>
        <c:otherwise>
            <input type="hidden" name="action" value="store"/>
        </c:otherwise>
    </c:choose>

    <label>Username</label>
    <input type="text" name="username" value="${mode == 'edit' ? user.username : username}" required/>

    <label>Password</label>
    <input type="text" name="password" value="${mode == 'edit' ? user.password : ''}" required/>

    <label>Role</label>
    <select name="role" required>
        <c:set var="r" value="${mode == 'edit' ? user.role : role}" />
        <option value="1" ${r == 1 || r == '1' ? 'selected' : ''}>Manager</option>
        <option value="2" ${r == 2 || r == '2' ? 'selected' : ''}>Staff</option>
        <option value="3" ${r == 3 || r == '3' ? 'selected' : ''}>Guest</option>
    </select>

    <div style="margin-top:16px">
        <button class="btn" type="submit">${mode == 'edit' ? 'Update' : 'Create'}</button>
        <a class="btn" href="${pageContext.request.contextPath}/manager/users">Back</a>
    </div>
</form>
</body>
</html>
