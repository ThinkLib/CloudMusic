<template>
	<div class="cm-page-main">
		<div class="cm-search-head">
			搜索<span>{{ $route.params.keywords }}</span
			>{{ nowSearchType[2] }},找到{{ searchParams[nowSearchType[0]].count }}条记录
		</div>
		<TabBar :data="searchType" @select="tabBarSelect" />
		<div class="cm-search-main">
			<SongList v-show="nowSearchType[0] === 'songs'" :data="searchResult.songs" :loading="loading" :page="false" @scroll-end="loadMore" />
			<ArtistList v-show="nowSearchType[0] === 'artists'" :data="searchResult.artists" :loading="loading" @scroll-end="loadMore" />
			<PlayList v-show="nowSearchType[0] === 'playlists'" :data="searchResult.playlists" :loading="loading" @scroll-end="loadMore" />
			<AlbumList v-show="nowSearchType[0] === 'albums'" :data="searchResult.albums" :loading="loading" @scroll-end="loadMore" />
			<VideoList v-show="nowSearchType[0] === 'videos'" :data="searchResult.videos" :loading="loading" @scroll-end="loadMore" />
			<RadioList v-show="nowSearchType[0] === 'djRadios'" :data="searchResult.djRadios" :loading="loading" @scroll-end="loadMore" />
			<UserList v-show="nowSearchType[0] === 'userprofiles'" :data="searchResult.userprofiles" :loading="loading" @scroll-end="loadMore" />
		</div>
	</div>
</template>

<script>
import ArtistList from '../../components/MusicCom/ListCom/ArtistList';
import PlayList from '../../components/MusicCom/ListCom/PlayList';
import AlbumList from '../../components/MusicCom/ListCom/AlbumList';
import VideoList from '../../components/MusicCom/ListCom/VideoList';
import RadioList from '../../components/MusicCom/ListCom/RadioList';
import UserList from '../../components/MusicCom/ListCom/UserList';
export default {
	name: 'SearchPage',
	components: {
		ArtistList,
		PlayList,
		AlbumList,
		VideoList,
		RadioList,
		UserList
	},
	data() {
		return {
			searchType: [
				{
					name: '单曲',
					type: 'songs',
					value: 1,
					active: 'active'
				},
				{
					name: '歌手',
					type: 'artists',
					value: 100,
					active: ''
				},
				{
					name: '歌单',
					type: 'playlists',
					value: 1000,
					active: ''
				},
				{
					name: '专辑',
					type: 'albums',
					value: 10,
					active: ''
				},
				{
					name: '视频',
					type: 'videos',
					value: 1014,
					active: ''
				},
				{
					name: '电台',
					type: 'djRadios',
					value: 1009,
					active: ''
				},
				{
					name: '用户',
					type: 'userprofiles',
					value: 1002,
					active: ''
				}
			],
			loading: false,
			nowSearchType: ['songs', 1],
			searchResult: {
				songs: [],
				artists: [],
				playlists: [],
				albums: [],
				videos: [],
				djRadios: [],
				userprofiles: []
			},
			searchParams: {
				songs: {
					page: 0,
					count: 0
				}
			}
		};
	},
	watch: {
		'$route.params.keywords': function() {
			for (let i in this.searchResult) {
				this.searchResult[i] = [];
			}
			this.searchPost(0);
		}
	},
	created() {
		this.searchType.forEach(item => {
			this.searchResult[item.type] = [];
			this.searchParams[item.type] = { page: 0, count: 0 };
		});
	},
	mounted() {
		if (this.$route.params.keywords) {
			this.changeType(this.searchType[0], 0);
			this.searchPost(0);
		}
	},
	methods: {
		tabBarSelect(item, index) {
			this.changeType(item, index, true);
		},
		changeType(type, index, flag) {
			this.nowSearchType = [type.type, type.value, type.name];
			if (flag) {
				if (this.searchResult[type.type].length === 0) {
					this.searchPost(this.searchParams[type.type].page);
				}
			}
		},
		searchPost(page) {
			let type = this.nowSearchType[0];
			this.loading = page === 0;
			this.$Api.Music.search(
				{
					keywords: this.$route.params.keywords,
					type: this.nowSearchType[1],
					limit: 50,
					offset: page * 50
				},
				rs => {
					this.loading = false;
					let data = rs.result[type] || [];
					let countType = type.substring(0, type.length - 1) + 'Count'; //拼接记录总数的key
					this.searchParams[type].page = page; //记录页数
					if (page === 0) {
						this.searchParams[type].count = rs.result[countType] || rs.result[type + 'Count']; //获取有搜索结果长度
						this.searchResult[type] = data;
					} else {
						this.searchResult[type] = [...this.searchResult[type], ...data];
					}
				}
			);
		},
		loadMore() {
			let type = this.nowSearchType[0];
			if (this.searchParams[type].count > this.searchResult[type].length) {
				this.searchParams[type].page++;
				this.searchPost(this.searchParams[type].page);
			}
		}
	}
};
</script>

<style scoped>
.cm-page-main {
	overflow: hidden;
}
.cm-search-head {
	width: 100%;
	height: 30px;
	line-height: 30px;
	font-size: 14px;
}
.cm-search-head span {
	color: #e56464;
	padding: 0 5px;
}
.cm-search-main {
	width: 100%;
	height: calc(100% - 65px);
}
</style>
