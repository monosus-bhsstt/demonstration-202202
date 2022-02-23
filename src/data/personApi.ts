import personJson from "./persons.json";

export interface IPerson {
	_id: string;
	index: number;
	guid: string;
	isActive: boolean;
	balance: string;
	picture: string;
	age: number;
	eyeColor: string;
	name: string;
	gender: "male" | "female" | "";
	company: string;
	email: string;
	phone: string;
	address: string;
	about: string;
	registered: string;
	latitude: number;
	longitude: number;
	tags: string[];
	friends: {
		id: number;
		name: string;
	}[];
	greeting: string;

	favoriteFruit: "apple" | "banana" | "strawberry";
}

export const personNameList = personJson.map((p: IPerson) => p.name);

export const personInfo = personJson.map((p: IPerson) => {
	return {
		name: p.name,
		age: p.age,
		friend: p.friends,
		index: p.index,
		address: p.address,
		email: p.email,
		phone: p.phone,
		gender: p.gender,
		favoriteFruit: p.favoriteFruit,
	};
});
