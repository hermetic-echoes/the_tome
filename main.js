(() => {
	class PageBuilders {
		static list_page(heading, topics, back = null) {
			const root = document.body;
			root.innerHTML = '';

			if (back !== null) {
				const button__back = document.createElement('button');
				button__back.type = 'button';
				button__back.innerText = back.name;
				button__back.addEventListener('click', back.on_click);

				root.appendChild(button__back);
			}

			{
				const h1__heading = document.createElement('h1');
				h1__heading.innerText = heading;
	
				root.appendChild(h1__heading);
			}

			{
				const ul__topics = document.createElement('ul');

				for (const topic of topics) {
					const li__topic = document.createElement('li');

					{
						const button__topic = document.createElement('button');
						button__topic.type = 'button';
						button__topic.innerText = topic.name;
						button__topic.addEventListener('click', topic.on_click);

						li__topic.appendChild(button__topic);
					}

					ul__topics.appendChild(li__topic);
				}

				root.appendChild(ul__topics);
			}
		}
	}

	class FlashCard__StartSide {
		static __front = Symbol();
		static __back = Symbol();
		static __random = Symbol();
	}

	class ComponentBuilders {
		static flash_card(front, back, start_side) {

		}
	}

	class Page__Music__ScaleDegrees {
		static load() {

		}
	}

	class Page__Music {
		static #topics = [
			{
				name: 'Scale Degrees',
				on_click: Page__Music__ScaleDegrees.load,
			}
		];

		static load() {
			PageBuilders.list_page('Music', Page__Music.#topics, { name: 'Home', on_click: Page__Home.load });
		}
	}

	class Page__Home {
		static #topics = [
			{
				name: 'Music',
				on_click: Page__Music.load,
			}
		];

		static load() {
			PageBuilders.list_page('Topics', Page__Home.#topics);
		}
	}

	Page__Home.load();

	class StringType {
		static __display = Symbol();
		static __keyboard_friendly = Symbol();
	}

	class Music__NoteModifier {
		static __b = Symbol();
		static __n = Symbol();
		static __s = Symbol();

		static as_string(variant, type = StringType.__display) {
			switch (type) {
				case StringType.__display:
					return Music__NoteModifier.#as_display_string(variant);
				case StringType.__keyboard_friendly:
					return Music__NoteModifier.#as_keyboard_friendly_string(variant);
			}
		}

		static #as_display_string(variant) {
			switch (variant) {
				case Music__NoteModifier.__b:
					return '♭';
				case Music__NoteModifier.__n:
					return '♮';
				case Music__NoteModifier.__s:
					return '♯';
			}
		}

		static #as_keyboard_friendly_string(variant) {
			switch (variant) {
				case Music__NoteModifier.__b:
					return 'b';
				case Music__NoteModifier.__n:
					return '';
				case Music__NoteModifier.__s:
					return 's';
			}
		}

		static from_int(value) {
			if (value < 0) {
				return Music__NoteModifier.__b;
			} else if (value == 0) {
				return Music__NoteModifier.__n;
			} else {
				return Music__NoteModifier.__s;
			}
		}

		static to_int(variant) {
			switch (variant) {
				case Music__NoteModifier.__b:
					return -1;
				case Music__NoteModifier.__n:
					return 0;
				case Music__NoteModifier.__s:
					return 1;
			}
		}
	}

	class Music__NoteLetter {
		static __c = Symbol();
		static __d = Symbol();
		static __e = Symbol();
		static __f = Symbol();
		static __g = Symbol();
		static __a = Symbol();
		static __b = Symbol();

		static as_string(variant, type = StringType.__display) {
			switch (type) {
				case StringType.__display:
					return Music__NoteLetter.#as_display_string(variant);
				case StringType.__keyboard_friendly:
					return Music__NoteLetter.#as_keyboard_friendly_string(variant);
			}
		}

		static #as_display_string(variant) {
			switch (variant) {
				case Music__NoteLetter.__c:
					return 'C';
				case Music__NoteLetter.__d:
					return 'D';
				case Music__NoteLetter.__e:
					return 'E';
				case Music__NoteLetter.__f:
					return 'F';
				case Music__NoteLetter.__g:
					return 'G';
				case Music__NoteLetter.__a:
					return 'A';
				case Music__NoteLetter.__b:
					return 'B';
			}
		}

		static #as_keyboard_friendly_string(variant) {
			switch (variant) {
				case Music__NoteLetter.__c:
					return 'c';
				case Music__NoteLetter.__d:
					return 'd';
				case Music__NoteLetter.__e:
					return 'e';
				case Music__NoteLetter.__f:
					return 'f';
				case Music__NoteLetter.__g:
					return 'g';
				case Music__NoteLetter.__a:
					return 'a';
				case Music__NoteLetter.__b:
					return 'b';
			}
		}
	}

	class Music__Note {
		#letter;
		#modifier;

		constructor(letter, modifier) {
			this.#letter = letter;
			this.#modifier = modifier;
		}

		get letter() {
			return this.#letter;
		}

		get modifier() {
			return this.#modifier;
		}

		as_string(type = StringType.__display) {
			return `${this.#letter__as_string(type)}${this.#modifier__as_string(type)}`;
		}

		#modifier__as_string(type) {
			let as_string = '';
			
			const modifier = Music__NoteModifier.from_int(this.#modifier);

			switch (modifier) {
				case Music__NoteModifier.__b:
					for (let i = this.#modifier; i < 0; i++) {
						as_string += Music__NoteModifier.as_string(modifier, type);
					}
					break;
				case Music__NoteModifier.__n:
					as_string = Music__NoteModifier.as_string(modifier, type);
					break;
				case Music__NoteModifier.__s:
					let as_string = '';
					for (let i = 1; i <= this.modifier; i++) {
						as_string += Music__NoteModifier.as_string(modifier, type);
					}
			}

			return as_string;
		}

		#letter__as_string(type) {
			return Music__NoteLetter.as_string(this.#letter, type);
		}

		new__diatonic_root(letter, modifier) {
			return new Music__Note(letter, Music__NoteModifier.to_int(modifier));
		}

		new__scale_degree_of(scale_degree) {
			switch (scale_degree) {
				case Music__ScaleDegree.__1:
					return this.#new__1_of();
				case Music__ScaleDegree.__2b:
					return this.#new__2b_of();
				case Music__ScaleDegree.__2:
					return this.#new__2_of();
				case Music__ScaleDegree.__3b:
					return this.#new__3b_of();
				case Music__ScaleDegree.__3:
					return this.#new__3_of();
				case Music__ScaleDegree.__4:
					return this.#new__4_of();
				case Music__ScaleDegree.__4s:
					return this.#new__4s_of();
				case Music__ScaleDegree.__5b:
					return this.#new__5b_of();
				case Music__ScaleDegree.__5:
					return this.#new__5_of();
				case Music__ScaleDegree.__5s:
					return this.#new__5s_of();
				case Music__ScaleDegree.__6b:
					return this.#new__6b_of();
				case Music__ScaleDegree.__6:
					return this.#new__6_of();
				case Music__ScaleDegree.__7b:
					return this.#new__7b_of();
				case Music__ScaleDegree.__7:
					return this.#new__7_of();
				case Music__ScaleDegree.__8:
					return this.#new__8_of();
				case Music__ScaleDegree.__9b:
					return this.#new__9b_of();
				case Music__ScaleDegree.__9:
					return this.#new__9_of();
				case Music__ScaleDegree.__9s:
					return this.#new__9s_of();
				case Music__ScaleDegree.__11:
					return this.#new__11_of();
				case Music__ScaleDegree.__11s:
					return this.#new__11s_of();
				case Music__ScaleDegree.__13b:
					return this.#new__13b_of();
				case Music__ScaleDegree.__13:
					return this.#new__13_of();
			}
		}

		#new__1_of() {
			return new Music__Note(this.letter, this.modifier);
		}

		#new__2b_of() {
			const interim = this.#new__2_of();

			return new Music__Note(interim.letter, interim.modifier - 1);
		}

		#new__2_of() {
			let letter;
			let modifier;

			switch (this.letter) {
				case Music__NoteLetter.__c:
					letter = Music__NoteLetter.__d;
				case Music__NoteLetter.__d:
					letter = Music__NoteLetter.__e;
				case Music__NoteLetter.__e:
					letter = Music__NoteLetter.__f;
				case Music__NoteLetter.__f:
					letter = Music__NoteLetter.__g;
				case Music__NoteLetter.__g:
					letter = Music__NoteLetter.__a;
				case Music__NoteLetter.__a:
					letter = Music__NoteLetter.__b;
				case Music__NoteLetter.__b:
					letter = Music__NoteLetter.__c;
			}

			switch (this.letter) {
				case Music__NoteLetter.__e:
				case Music__NoteLetter.__b:
					modifier = this.modifier + 1;
					break;
				default:
					modifier = this.modifier;
			}

			return new Music__Note(letter, modifier);
		}

		#new__3b_of() {
			const interim = this.#new__3_of();
			
			return new Music__Note(interim.letter, interim.modifier - 1);
		}

		#new__3_of() {
			let letter;
			let modifier;

			switch (this.letter) {
				case Music__NoteLetter.__c:
					letter = Music__NoteLetter.__e;
				case Music__NoteLetter.__d:
					letter = Music__NoteLetter.__f;
				case Music__NoteLetter.__e:
					letter = Music__NoteLetter.__g;
				case Music__NoteLetter.__f:
					letter = Music__NoteLetter.__a;
				case Music__NoteLetter.__g:
					letter = Music__NoteLetter.__b;
				case Music__NoteLetter.__a:
					letter = Music__NoteLetter.__c;
				case Music__NoteLetter.__b:
					letter = Music__NoteLetter.__d;
			}

			switch (this.letter) {
				case Music__NoteLetter.__d:
				case Music__NoteLetter.__e:
				case Music__NoteLetter.__a:
				case Music__NoteLetter.__b:
					modifier = this.modifier + 1;
					break;
				default:
					modifier = this.modifier;
			}

			return new Music__Note(letter, modifier);
		}

		#new__4_of() {
			let letter;
			let modifier;

			switch (this.letter) {
				case Music__NoteLetter.__c:
					letter = Music__NoteLetter.__f;
				case Music__NoteLetter.__d:
					letter = Music__NoteLetter.__g;
				case Music__NoteLetter.__e:
					letter = Music__NoteLetter.__a;
				case Music__NoteLetter.__f:
					letter = Music__NoteLetter.__b;
				case Music__NoteLetter.__g:
					letter = Music__NoteLetter.__c;
				case Music__NoteLetter.__a:
					letter = Music__NoteLetter.__d;
				case Music__NoteLetter.__b:
					letter = Music__NoteLetter.__e;
			}

			switch (this.letter) {
				case Music__NoteLetter.__f:
					modifier = this.modifier - 1;
					break;
				default:
					modifier = this.modifier;
			}

			return new Music__Note(letter, modifier);
		}

		#new__4s_of() {
			const interim = this.#new__4_of();
			
			return new Music__Note(interim.letter, interim.modifier + 1);
		}

		#new__5b_of() {
			const interim = this.#new__5_of();
			
			return new Music__Note(interim.letter, interim.modifier - 1);
		}

		#new__5_of() {
			let letter;
			let modifier;

			switch (this.letter) {
				case Music__NoteLetter.__c:
					letter = Music__NoteLetter.__g;
				case Music__NoteLetter.__d:
					letter = Music__NoteLetter.__a;
				case Music__NoteLetter.__e:
					letter = Music__NoteLetter.__b;
				case Music__NoteLetter.__f:
					letter = Music__NoteLetter.__c;
				case Music__NoteLetter.__g:
					letter = Music__NoteLetter.__d;
				case Music__NoteLetter.__a:
					letter = Music__NoteLetter.__e;
				case Music__NoteLetter.__b:
					letter = Music__NoteLetter.__f;
			}

			switch (this.letter) {
				case Music__NoteLetter.__b:
					modifier = this.modifier + 1;
					break;
				default:
					modifier = this.modifier;
			}

			return new Music__Note(letter, modifier);
		}

		#new__5s_of() {
			const interim = this.#new__5_of();
			
			return new Music__Note(interim.letter, interim.modifier + 1);
		}

		#new__6b_of() {
			const interim = this.#new__6_of();
			
			return new Music__Note(interim.letter, interim.modifier - 1);
		}

		#new__6_of() {
			let letter;
			let modifier;

			switch (this.letter) {
				case Music__NoteLetter.__c:
					letter = Music__NoteLetter.__a;
				case Music__NoteLetter.__d:
					letter = Music__NoteLetter.__b;
				case Music__NoteLetter.__e:
					letter = Music__NoteLetter.__c;
				case Music__NoteLetter.__f:
					letter = Music__NoteLetter.__d;
				case Music__NoteLetter.__g:
					letter = Music__NoteLetter.__e;
				case Music__NoteLetter.__a:
					letter = Music__NoteLetter.__f;
				case Music__NoteLetter.__b:
					letter = Music__NoteLetter.__g;
			}

			switch (this.letter) {
				case Music__NoteLetter.__e:
				case Music__NoteLetter.__a:
				case Music__NoteLetter.__b:
					modifier = this.modifier + 1;
					break;
				default:
					modifier = this.modifier;
			}

			return new Music__Note(letter, modifier);
		}

		#new__7b_of() {
			const interim = this.#new__7_of();
			
			return new Music__Note(interim.letter, interim.modifier - 1);
		}

		#new__7_of() {
			let letter;
			let modifier;

			switch (this.letter) {
				case Music__NoteLetter.__c:
					letter = Music__NoteLetter.__b;
				case Music__NoteLetter.__d:
					letter = Music__NoteLetter.__c;
				case Music__NoteLetter.__e:
					letter = Music__NoteLetter.__d;
				case Music__NoteLetter.__f:
					letter = Music__NoteLetter.__e;
				case Music__NoteLetter.__g:
					letter = Music__NoteLetter.__f;
				case Music__NoteLetter.__a:
					letter = Music__NoteLetter.__g;
				case Music__NoteLetter.__b:
					letter = Music__NoteLetter.__a;
			}

			switch (this.letter) {
				case Music__NoteLetter.__e:
				case Music__NoteLetter.__g:
				case Music__NoteLetter.__a:
				case Music__NoteLetter.__b:
					modifier = this.modifier + 1;
					break;
				default:
					modifier = this.modifier;
			}

			return new Music__Note(letter, modifier);
		}

		#new__8_of() {
			return this.#new__1_of();
		}

		#new__9b_of() {
			const interim = this.#new__9_of();
			
			return new Music__Note(interim.letter, interim.modifier - 1);
		}

		#new__9_of() {
			return this.#new__2_of();
		}

		#new__9s_of() {
			const interim = this.#new__9_of();
			
			return new Music__Note(interim.letter, interim.modifier + 1);
		}

		#new__11_of() {
			return this.#new__4_of();
		}

		#new__11s_of() {
			const interim = this.#new__11_of();
			
			return new Music__Note(interim.letter, interim.modifier + 1);
		}

		#new__13b_of() {
			const interim = this.#new__13_of();
			
			return new Music__Note(interim.letter, interim.modifier - 1);
		}

		#new__13_of() {
			return this.#new__6_of();
		}
	}

	class Music__ScaleDegree {
		static __1 = Symbol();
		static __2b = Symbol();
		static __2 = Symbol();
		static __3b = Symbol();
		static __3 = Symbol();
		static __4 = Symbol();
		static __4s = Symbol();
		static __5b = Symbol();
		static __5 = Symbol();
		static __5s = Symbol();
		static __6b = Symbol();
		static __6 = Symbol();
		static __7b = Symbol();
		static __7 = Symbol();
		static __8 = Symbol();
		static __9b = Symbol();
		static __9 = Symbol();
		static __9s = Symbol();
		static __11 = Symbol();
		static __11s = Symbol();
		static __13b = Symbol();
		static __13 = Symbol();

		static as_string(variant, type = StringType.__display) {
			switch (type) {
				case StringType.__display:
					return Music__ScaleDegree.#as_display_string(variant);
				case StringType.__keyboard_friendly:
					return Music__ScaleDegree.#as_keyboard_friendly_string(variant);
			}
		}

		static #as_display_string(variant) {
			switch (variant) {
				case Music__ScaleDegree.__1:
					return '1';
				case Music__ScaleDegree.__2b:
					return `2${Music__NoteModifier.as_string(Music__NoteModifier.__b)}`;
				case Music__ScaleDegree.__2:
					return '2';
				case Music__ScaleDegree.__3b:
					return `3${Music__NoteModifier.as_string(Music__NoteModifier.__b)}`;
				case Music__ScaleDegree.__3:
					return '3';
				case Music__ScaleDegree.__4:
					return '4';
				case Music__ScaleDegree.__4s:
					return `4${Music__NoteModifier.as_string(Music__NoteModifier.__s)}`;
				case Music__ScaleDegree.__5b:
					return `5${Music__NoteModifier.as_string(Music__NoteModifier.__b)}`;
				case Music__ScaleDegree.__5:
					return '5';
				case Music__ScaleDegree.__5s:
					return `5${Music__NoteModifier.as_string(Music__NoteModifier.__s)}`;
				case Music__ScaleDegree.__6b:
					return `6${Music__NoteModifier.as_string(Music__NoteModifier.__b)}`;
				case Music__ScaleDegree.__6:
					return '6';
				case Music__ScaleDegree.__7b:
					return `7${Music__NoteModifier.as_string(Music__NoteModifier.__b)}`;
				case Music__ScaleDegree.__7:
					return '7';
				case Music__ScaleDegree.__8:
					return '8';
				case Music__ScaleDegree.__9b:
					return `9${Music__NoteModifier.as_string(Music__NoteModifier.__b)}`;
				case Music__ScaleDegree.__9:
					return '9';
				case Music__ScaleDegree.__9s:
					return `9${Music__NoteModifier.as_string(Music__NoteModifier.__s)}`;
				case Music__ScaleDegree.__11:
					return '11';
				case Music__ScaleDegree.__11s:
					return `11${Music__NoteModifier.as_string(Music__NoteModifier.__s)}`;
				case Music__ScaleDegree.__13b:
					return `13${Music__NoteModifier.as_string(Music__NoteModifier.__b)}`;
				case Music__ScaleDegree.__13:
					return '13';
			}
		}

		static #as_keyboard_friendly_string(variant) {
			switch (variant) {
				case Music__ScaleDegree.__1:
					return '1';
				case Music__ScaleDegree.__2b:
					return `2${Music__NoteModifier.as_string(Music__NoteModifier.__b, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__2:
					return '2';
				case Music__ScaleDegree.__3b:
					return `3${Music__NoteModifier.as_string(Music__NoteModifier.__b, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__3:
					return '3';
				case Music__ScaleDegree.__4:
					return '4';
				case Music__ScaleDegree.__4s:
					return `4${Music__NoteModifier.as_string(Music__NoteModifier.__s, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__5b:
					return `5${Music__NoteModifier.as_string(Music__NoteModifier.__b, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__5:
					return '5';
				case Music__ScaleDegree.__5s:
					return `5${Music__NoteModifier.as_string(Music__NoteModifier.__s, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__6b:
					return `6${Music__NoteModifier.as_string(Music__NoteModifier.__b, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__6:
					return '6';
				case Music__ScaleDegree.__7b:
					return `7${Music__NoteModifier.as_string(Music__NoteModifier.__b, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__7:
					return '7';
				case Music__ScaleDegree.__8:
					return '8';
				case Music__ScaleDegree.__9b:
					return `9${Music__NoteModifier.as_string(Music__NoteModifier.__b, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__9:
					return '9';
				case Music__ScaleDegree.__9s:
					return `9${Music__NoteModifier.as_string(Music__NoteModifier.__s, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__11:
					return '11';
				case Music__ScaleDegree.__11s:
					return `11${Music__NoteModifier.as_string(Music__NoteModifier.__s, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__13b:
					return `13${Music__NoteModifier.as_string(Music__NoteModifier.__b, StringType.__keyboard_friendly)}`;
				case Music__ScaleDegree.__13:
					return '13';
			}
		}
	}
})();
