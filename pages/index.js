import React from "react"
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";
import { channelService } from "../src/services/channelService";

function HomePage() {
  const serviceVideo = videoService()
  const serviceChannel = channelService()
  const [valorDoFiltro, setValorDoFiltro] = React.useState("")
  const [playlists, setPlaylists] = React.useState({})
  const [channels, setChannels] = React.useState([])

  React.useEffect(() => {
    serviceVideo.getAllVideos()
      .then((dados) => {
        const novasPlaylists = { ...playlists }
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = []
          }
          novasPlaylists[video.playlist].push(video)
        })
        setPlaylists(novasPlaylists)
      })
    serviceChannel.getAllChannels()
      .then((dados) => {
        const channels = []
        dados.data.forEach((channel) => {
          channels.push(channel)
        })
        setChannels(channels)
      })
  }, [])

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playlists} channels={channels}>
          Conteúdo
        </Timeline>
      </div>
    </>
  )
}

export default HomePage

const StyledHeader = styled.div`
	background-color: ${({ theme }) => theme.backgroundLevel1};
	
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`
const StyledBanner = styled.div`
	background-color: blue;
	background-image: url(${({ bg }) => bg});
	background-size: cover;
	height: 230px;
`
function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...props }) {
  const playlistsNames = Object.keys(props.playlists)
  const channels = props.channels
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistName) => {
        const videos = props.playlists[playlistName]
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase()
                const searchValueNormalized = searchValue.toLowerCase()
                return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
      <section>
        <h2>Canais</h2>
        <div id="channels">
          {channels.map((channel) => {
            return (
              <a key={channel.url} href={channel.url}>
                <img src={channel.image}></img>
                <span>
                  {channel.nome}
                </span>
              </a>
            )
          })}
        </div>
      </section>
    </StyledTimeline>
  )
}
