<template>
	<div class="cm-main">
		<MusicClassify :style="{ height: mainHeight }" :class="(showFull ? 'full' : '') + (fullPage ? ' full-page' : '')" />
		<section class="cm-right" :style="{ height: mainHeight }">
			<MusicHeader :UserInfo="UserInfo" :NowPlay="NowPlay" :full="showFull" />
			<section class="cm-right-main" :class="fullPage ? 'full-page' : ''">
				<loading v-show="!login" />
				<transition name="fade" mode="out-in">
					<keep-alive v-if="login">
						<router-view v-if="routerKey" :key="routerKey" />
						<router-view v-else />
					</keep-alive>
				</transition>
			</section>
		</section>
		<FullPlayer ref="fully" :analyser="analyser" :PlayList="PlayList" :NowPlay="NowPlay" :playState="playState" :style="{ top: showFull ? '0' : '100%' }" />
		<PlayerControl
			ref="player"
			:analyser="analyser"
			:PlayList="PlayList"
			@playing="playing"
			@full="playerControl"
			@playState="playStateUpdate"
			:style="{ height: PlayList.length ? '60px' : 0 }"
		/>
		<BlurBackground :url="NowPlay.picture" :style="{ height: PlayList.length ? '60px' : 0 }" />
	</div>
</template>

<script>
import MusicClassify from '../components/MusicWindow/MusicClassify';
import MusicHeader from '../components/MusicWindow/MusicHeader';
import PlayerControl from '../components/MusicWindow/PlayerControl';
import BlurBackground from '../components/MusicWindow/BlurBackground';
import FullPlayer from '../components/MusicWindow/FullPlayer';
export default {
	name: 'MusicWindow',
	components: {
		MusicClassify,
		MusicHeader,
		PlayerControl,
		BlurBackground,
		FullPlayer
	},
	provide() {
		return {
			playMusic: (music, playlist) => {
				playlist.forEach(item => {
					this.$set(item, 'play', '');
				});
				this.$set(music, 'play', 'playing');
				if (this.PlayList.length) {
					if (this.PlayList[0].name !== playlist[0].name) {
						this.PlayList.forEach(item => {
							item.play = '';
						});
					}
				}
				this.PlayList = playlist;
			},
			playerControl: data => {
				this.playerControl(data);
			},
			fullControl: flag => {
				this.showFull = flag !== undefined ? flag : !this.showFull;
			},
			menuControl: flag => {
				this.fullPage = flag !== undefined ? flag : !this.fullPage;
			},
			isFull: () => {
				return this.showFull;
			},
			nowPlay: () => {
				return this.NowPlay;
			}
		};
	},
	data() {
		return {
			UserInfo: {},
			PlayList: [],
			NowPlay: {
				picture: this.$defaultAlbum
			},
			playState: 'sf-icon-play',
			showFull: false,
			analyser: {},
			login: false,
			fullPage: false
		};
	},
	computed: {
		mainHeight() {
			return this.PlayList.length ? 'calc(100% - 60px)' : '100%';
		},
		routerKey() {
			if (this.$route.path.Exist('artist-detail,user-playlist,playlist-detail,user-detail')) {
				return new Date().getTime();
			}
			return false;
		}
	},
	mounted() {
		this.audioCont();
	},
	created() {
		this.$ipc.on('win-data', (event, data) => {
			this.$Api.User.Login(
				data,
				() => {
					this.$getLikeList(() => {
						this.login = true;
					});
					this.$Api.LocalFile.read('user', data => {
						if (data.userId) {
							this.$nextTick(() => {
								this.UserInfo = data;
							});
						}
					});
				},
				() => {
					this.$ipc.send('system', 'logoff');
				}
			);
		});
	},
	methods: {
		playing(data) {
			this.NowPlay = data;
			this.$refs.fully.visualRound();
		},
		playerControl(data) {
			if (data) {
				this.$refs.player.PlayerCommend(data);
			} else {
				this.showFull = !this.showFull;
			}
		},
		playStateUpdate(data) {
			this.playState = data;
		},
		audioCont() {
			window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
			let ctx = new AudioContext();
			let audio = document.getElementById('audio');
			this.analyser = ctx.createAnalyser();
			let audioSrc = ctx.createMediaElementSource(audio);
			audioSrc.connect(this.analyser);
			this.analyser.connect(ctx.destination);
		}
	}
};
</script>

<style scoped>
.cm-main {
	background: #fff;
}
.cm-right-main {
	float: left;
	width: 100%;
	height: 100%;
	border-top: 1px solid #eee;
	background: #fff;
	-o-transition: all 350ms;
	-moz-transition: all 350ms;
	-webkit-transition: all 350ms;
	position: relative;
}
.full-page {
	position: absolute;
	left: 0;
	top: 60px;
}
</style>
