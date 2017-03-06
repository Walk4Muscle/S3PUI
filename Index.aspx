<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="S3PWebUI.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
         <asp:PlaceHolder runat="server" ID="SignedPH">
             <asp:Label ID="lblUserNam1e" runat="server" Text="UserName"></asp:Label><br/>
             <asp:LinkButton runat="server" ID="signoutBtn" OnClick="signoutBtn_Click">Click Me to Sign Out</asp:LinkButton>
    </asp:PlaceHolder>
        <br/>
        <br/>
    <asp:PlaceHolder runat="server" ID="SignInPH">
        <asp:LinkButton runat="servetestr" ID="signBtn" OnClick="signBtn_Click">Click Me to Sign</asp:LinkButton>
    </asp:PlaceHolder>
    </div>
    </form>
</body>
</html>
