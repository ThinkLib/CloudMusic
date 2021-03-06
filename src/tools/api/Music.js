import { Ajax } from './request';
import User from './User';
export default {
	download(data, callback, error) {
		Ajax({
			url: '/service/disk/Download',
			data: data,
			success: callback,
			error: error
		});
	},
	getUserPlayList(id, callback, error) {
		Ajax({
			url: '/user/playlist',
			method: 'get',
			data: {
				uid: id
			},
			success: callback,
			error: error
		});
	},
	search(data, callback, error) {
		Ajax({
			url: '/search',
			method: 'get',
			data: data,
			success: callback,
			error: error
		});
	},
	searchSuggest(key, callback, error) {
		Ajax({
			url: '/search/suggest',
			method: 'get',
			data: {
				keywords: key
			},
			success: callback,
			error: error
		});
	},
	simiMusic(id, callback, error) {
		Ajax({
			url: '/simi/song',
			method: 'get',
			data: {
				id: id
			},
			success: callback,
			error: error
		});
	},
	simiPlayList(id, callback, error) {
		Ajax({
			url: '/simi/playlist',
			method: 'get',
			data: {
				id: id
			},
			success: callback,
			error: error
		});
	},
	simiUser(id, callback, error) {
		Ajax({
			url: '/simi/user',
			method: 'get',
			data: {
				id: id
			},
			success: callback,
			error: error
		});
	},
	sublist: {
		method: 'get',
		sublistParams(page) {
			return {
				limit: 50,
				offset: (page || 0) * 50,
				_t: new Date().getTime()
			};
		},
		radio(page, callback, error) {
			Ajax({
				url: '/dj/sublist',
				method: this.method,
				data: this.sublistParams(page),
				success: callback,
				error: error
			});
		},
		artist(page, callback, error) {
			Ajax({
				url: '/artist/sublist',
				method: this.method,
				data: this.sublistParams(page),
				success: callback,
				error: error
			});
		},
		album(page, callback, error) {
			Ajax({
				url: '/album/sublist',
				method: this.method,
				data: this.sublistParams(page),
				success: callback,
				error: error
			});
		},
		mv(page, callback, error) {
			Ajax({
				url: '/mv/sublist',
				method: this.method,
				data: this.sublistParams(page),
				success: callback,
				error: error
			});
		}
	} /*收藏列表*/,
	subscribe: {
		playlist: (data, callback, error) => {
			Ajax({
				url: '/playlist/subscribe',
				method: 'get',
				data: data,
				success: callback,
				error: error
			});
		},
		album: (data, callback, error) => {
			Ajax({
				url: '/album/sub',
				method: 'get',
				data: data,
				success: callback,
				error: error
			});
		},
		radio: (data, callback, error) => {
			Ajax({
				url: '/dj/sub',
				method: 'get',
				data: data,
				success: callback,
				error: error
			});
		}
	} /*收藏操作*/,
	artist: {
		detail(id, callback, error) {
			Ajax({
				url: '/artist/desc',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		},
		music(id, offset, callback, error) {
			Ajax({
				url: '/artists',
				method: 'get',
				data: {
					id: id,
					limit: 50,
					offset: offset * 50
				},
				success: callback,
				error: error
			});
		},
		mv(id, offset, callback, error) {
			Ajax({
				url: '/artist/mv',
				method: 'get',
				data: {
					id: id,
					limit: 50,
					offset: offset * 50
				},
				success: callback,
				error: error
			});
		},
		simi(id, offset, callback, error) {
			Ajax({
				url: '/simi/artist',
				method: 'get',
				data: {
					id: id,
					limit: 50,
					offset: offset * 50
				},
				success: callback,
				error: error
			});
		}
	} /*歌手*/,
	playlist: {
		subscribers(id, offset, callback, error) {
			Ajax({
				url: '/playlist/subscribers',
				method: 'get',
				data: {
					id: id,
					limit: 50,
					offset: offset * 50
				},
				success: callback,
				error: error
			});
		},
		musicList(id, offset, callback, error) {
			Ajax({
				url: '/playlist/detail',
				method: 'get',
				data: {
					id: id,
					limit: 50,
					offset: offset * 50
				},
				success: callback,
				error: error
			});
		},
		comment(id, offset, callback, error) {
			Ajax({
				url: '/comment/playlist',
				method: 'get',
				data: {
					id: id,
					limit: 200,
					offset: offset * 200
				},
				success: callback,
				error: error
			});
		},
		recommend(callback, error) {
			Ajax({
				url: '/recommend/resource',
				success: callback,
				error: error
			});
		}
	} /*歌单*/,
	album: {
		musicList(id, offset, callback, error) {
			Ajax({
				url: '/album',
				method: 'get',
				data: {
					id: id,
					limit: 50,
					offset: offset * 50
				},
				success: callback,
				error: error
			});
		},
		comment(id, offset, callback, error) {
			Ajax({
				url: '/comment/album',
				method: 'get',
				data: {
					limit: 200,
					offset: offset * 200,
					id: id
				},
				success: callback,
				error: error
			});
		},
		dynamic(id, callback, error) {
			Ajax({
				url: '/album/dynamic',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		}
	} /*专辑*/,
	mv: {
		getUrl(id, callback, error) {
			Ajax({
				url: '/mv/url',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		},
		comment(id, offset, callback, error) {
			Ajax({
				url: '/comment/mv',
				method: 'get',
				data: {
					limit: 200,
					offset: offset * 200,
					id: id
				},
				success: callback,
				error: error
			});
		},
		detail(id, callback, error) {
			Ajax({
				url: '/mv/detail',
				method: 'get',
				data: {
					mvid: id
				},
				success: callback,
				error: error
			});
		}
	} /*mv*/,
	video: {
		getUrl(id, callback, error) {
			Ajax({
				url: '/video/url',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		},
		detail(id, callback, error) {
			Ajax({
				url: '/video/detail',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		},
		comment(id, offset, callback, error) {
			Ajax({
				url: '/comment/video',
				method: 'get',
				data: {
					limit: 200,
					offset: offset * 200,
					id: id
				},
				success: callback,
				error: error
			});
		},
		related(id, callback, error) {
			Ajax({
				url: '/related/allvideo',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		}
	} /*视频*/,
	radio: {
		programs(id, offset, callback, error) {
			Ajax({
				url: '/dj/program',
				method: 'get',
				data: {
					limit: 50,
					offset: (offset - 1) * 50,
					rid: id
				},
				success: callback,
				error: error
			});
		},
		detail(id, callback, error) {
			Ajax({
				url: '/dj/program/detail',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		},
		comment(id, offset, callback, error) {
			Ajax({
				url: '/comment/dj',
				method: 'get',
				data: {
					limit: 200,
					offset: offset * 200,
					id: id
				},
				success: callback,
				error: error
			});
		}
	} /*电台*/,
	song: {
		comment(id, offset, callback, error) {
			Ajax({
				url: '/comment/music',
				method: 'get',
				data: {
					limit: 200,
					offset: offset * 200,
					id: id
				},
				success: callback,
				error: error
			});
		},
		lrc(id, callback, error) {
			Ajax({
				url: '/lyric',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		},
		detail(id, callback, error) {
			Ajax({
				url: '/song/detail',
				method: 'get',
				data: {
					ids: id
				},
				success: rs => {
					rs = rs.songs[0].al.picUrl;
					callback(rs);
				},
				error: error
			});
		},
		like(data, callback, error) {
			Ajax({
				url: '/like',
				method: 'get',
				data: data,
				success: callback,
				error: error
			});
		},
		likeList(callback, error) {
			let time = setInterval(() => {
				if (User.UserId) {
					Ajax({
						url: '/likelist',
						method: 'get',
						data: {
							uid: User.UserId
						},
						success: callback,
						error: error
					});
					clearInterval(time);
				}
			}, 500);
		},
		history(uid, callback, error) {
			Ajax({
				url: '/user/record',
				method: 'get',
				data: {
					type: 1,
					uid: uid ? uid : User.UserId
				},
				success: rs => {
					let data = [];
					let count = 0;
					let max = (rs.weekData && rs.weekData[0].playCount) || 0;
					if (rs.weekData) {
						rs.weekData.forEach(item => {
							data.push(item.song);
							count = count + item.playCount;
						});
					}
					callback(data, {
						count,
						max
					});
				},
				error: error
			});
		},
		addToList(data, callback, error) {
			data.op = 'add';
			Ajax({
				url: '/playlist/tracks',
				method: 'get',
				data: data,
				success: callback,
				error: error
			});
		},
		removeFromList(data, callback, error) {
			data.op = 'del';
			Ajax({
				url: '/playlist/tracks',
				method: 'get',
				data: data,
				success: callback,
				error: error
			});
		},
		mate(data, callback, error) {
			Ajax({
				url: 'https://api.zjinh.cn/service/open/mateMusic',
				data: data,
				success: callback,
				error: error
			});
		},
		url(id, callback, error) {
			Ajax({
				url: '/song/url',
				method: 'get',
				data: {
					id: id
				},
				success: callback,
				error: error
			});
		},
		recommend(callback, error) {
			Ajax({
				url: '/recommend/songs',
				success: callback,
				error: error
			});
		}
	} /*歌曲*/,
	comment: {
		like(data, callback, error) {
			Ajax({
				url: '/comment/like',
				method: 'get',
				data: data,
				success: callback,
				error: error
			});
		},
		control(data, callback, error) {
			Ajax({
				url: '/comment',
				method: 'get',
				data: data,
				success: callback,
				error: error
			});
		}
	} /*评论*/
};
