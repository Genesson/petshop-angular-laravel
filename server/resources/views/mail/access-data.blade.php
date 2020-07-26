<body style="margin: 0;padding: 0;width: 96%; border-radius: .5rem;">
    <div style="background:#ffffff;padding:0 2%;width:100%;border-radius: .5rem !important;">
        <table style="" width="100%" cellspacing="0" cellpadding="0" border="0"
            style="border-radius: .5rem !important; overflow: hidden !important">
            <tbody style="">
                <tr>
                    <td style="padding: .5rem 0;" align="center"><img
                            style="margin: 1rem auto; width: 12rem; max-width: 90%;"
                            src="https://{{env('APP_URL')}}/www/assets/logo/logo-kando.png"></td>
                </tr>
                <tr style="background-color: #eee; border-radius: .5rem; box-shadow: 2px 4px 10px rgba(0,0,0, .15);">
                    <td style="border-radius: .5rem;" align="center">
                        <table style="background-color: #eee " width="96%" cellspacing="0" cellpadding="0" border="0">
                            <tbody style="">
                                <tr>
                                    <td height="20"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <font size="3" face="ARIAL" color="#333">
                                            <p>Olá {{ $user->name}}, somos do {{env('APP_NAME')}}.</p>
                                            <p>Segue abaixo dados para acesso à sua conta.</p>

                                            <p>
                                                <b>E-mail: </b> {{$user->email}}
                                            </p>
                                            <p>
                                                <b>Senha: </b> {{$user->pass}}
                                            </p>

                                            <p
                                                style="margin: 1rem 0 2rem 0;color: red;font-weight: 900;background: rgba(255,0,0, .1);display: inline-block;padding:.5rem calc(2rem - 1%);border-radius: 5rem;">
                                                Não compartilhe seus dados de acesso com ninguêm. Recomendamos que
                                                altere sua senha após o login no sistema.
                                            </p>

                                            <a style="text-decoration: none; background: #072476;border: 0;border-radius: 40px;z-index: 1;font-size: 1.5rem;color:#fff;padding: 1rem;text-align: center;margin: 2rem auto;display: block;width: 17rem;max-width: 80%;text-transform: uppercase;box-shadow: 2px 3px 6px rgba(0,0,0, .3);"
                                                target="_blank" href="http://{{env('APP_URL')}}/www">
                                                Acessar o sistema
                                            </a>

                                            <small style="margin-top: 3rem;display: block;">E-mail gerado
                                                automaticamente. Favor não responder.</small>
                                        </font>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="15"></td>
                </tr>
                <tr>
                    <td align="center">
                        <font style="color: #425ab1;" face="ARIAL"><b>{{env('APP_NAME')}}</b><br>
                            <a style="color: #425ab1; text-decoration: none;"
                                href="https://{{env('APP_URL')}}">{{env('APP_URL')}}</a>
                        </font>
                        <br>
                    </td>
                </tr>
                <tr>
                    <td height="15"></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>