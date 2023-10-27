import * as C from '../../App.styles'
import logoGrowTweet from '/logo_growtweet.svg'


import Sidebar from '../SideBar'
import TogleMenu from '../TogleMenu'

import { ButtonTogleMenuStyled } from '../TogleMenu/TogleMenuStyled'
import FooterSideBar from '../FooterSideBar'
import ModalTweetDefault from '../ModalTweetDefault/ModalTweetDefault'
import { useCallback, useEffect, useState } from 'react'
import { CreateTweetRequest, TweetDto, create } from '../../config/services/tweet.service'
import { useNavigate } from 'react-router-dom'

interface LayoutDefaultProps {
    children?: React.ReactNode
}

const LayoutDefault: React.FC<LayoutDefaultProps> = ({ children }) => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
    const [usernameUser, setUsernameUser] = useState<string>('')
    const [idUser, setIdUser] = useState<string>('')
    const [tweet, setTweet] = useState<TweetDto[]>([])

    const [error, setError] = useState('');
    const [contentNewTeet, setContentNewtweet] = useState<string>('')

    function handleClose() {
        setIsOpen(false)
    }

    function handleOpen() {
        setIsOpen(true)
    }

    const token = localStorage.getItem("token")


    // useEffect(()=> {
    //     const getData = () => {

    //     }
    // },[])



    const addTweet = useCallback((tweet: CreateTweetRequest) => {

        if (!token) {
            navigate('/')
            return;
        }

        const newTweet: CreateTweetRequest = {
            idUser: `${idUser}`,
            usernameAuthorTweet: `${usernameUser}`,
            nameUser: `${nameAuthorTweet}`,
            content: tweet.content,
            token: token
        }

        // fetch(`${apiService}/tweets`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json', },
        //     body: JSON.stringify(newTweet),
        // }).then(response => {
        //     if (response.ok) {
        //         console.log('Tweet adicionado com sucesso')
        //     }
        // });
        // setTweet(prevTweets => [...prevTweets, newTweet]);
        // setContentNewtweet('')

        async function createTweet() {
            const response = await create(newTweet)

            if (response.code !== 201) {
                setError(response.message!)
                return;
            }

            setError('')
            setContentNewtweet(response.data.data.content)
        }
        createTweet()
    }, [])

    return (
        <>
            <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()} actionConfirm={() => addTweet({
                idUser: idUser,
                nameUser: nameAuthorTweet,
                usernameAuthorTweet: usernameUser,
                content: contentNewTeet,
                token: token!
            })} message={contentNewTeet}>
            </ModalTweetDefault>
            <div>
                <C.ContatinerLayoutDefault>
                    <C.ContainerSideBarDefault>
                        <Sidebar>
                            <div className="logoSideBar">
                                <img style={{ height: '35px', width: '100px' }} src={logoGrowTweet}></img>
                            </div>
                            <TogleMenu>
                                <ButtonTogleMenuStyled onClick={handleOpen} className='buttonTweet' type='button'>Tweetar</ButtonTogleMenuStyled>
                            </TogleMenu>
                        </Sidebar>
                        <FooterSideBar avatar={""} nameUser={""} usernameUser={""} />
                    </C.ContainerSideBarDefault>
                    {children}
                </C.ContatinerLayoutDefault>
            </div></>
    )
}

export default LayoutDefault






// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// const drawerWidth = 240;

// export default function Home() {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Permanent drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Divider />
//         <List>
//           {['Inbox', 'Starred'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
//       >
//         <Toolbar />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//           tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
//           enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
//           imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
//           Convallis convallis tellus id interdum velit laoreet id donec ultrices.
//           Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
//           nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
//           leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
//           feugiat vivamus at augue. At augue eget arcu dictum varius duis at
//           consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
//           sapien faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
//           eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
//           neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
//           tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
//           sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
//           tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
//           gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
//           et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
//           tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
//           eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
//           posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }
