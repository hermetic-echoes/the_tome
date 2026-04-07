(() => {
	class Music {
		static NoteModifier = class NoteModifier {
			static __b = Symbol();
			static __n = Symbol();
			static __s = Symbol();

			static as_display_string(variant) {
				switch (variant) {
					case Music.NoteModifier.__b:
						return '♭';
					case Music.NoteModifier.__n:
						return '♮';
					case Music.NoteModifier.__s:
						return '♯';
				}
			}

			static as_keyboard_friendly_string(variant) {
				switch (variant) {
					case Music.NoteModifier.__b:
						return 'b';
					case Music.NoteModifier.__n:
						return '';
					case Music.NoteModifier.__s:
						return 's';
				}
			}
		};
	}
})();
