const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {slug} = require('../helpers/slug');
//const {AUTH_CACHE} = require('../models/authentication');
const {contentRaw} = require('./shares');

//SERVICES TOKEN

const servicesEmailVerificationEmailSchema = new Schema({
    address: {type :String, required : true},
    ip: {type :String, default : ""},
    bounced : {type: Boolean, default: false}
}, {_id: false});

const servicesEmailVerificationSchema = new Schema({
    token: {type : String, required : true},
    email: {type: servicesEmailVerificationEmailSchema, default: servicesEmailVerificationEmailSchema},
    when: {type : Date, required : true}
}, {_id: false});

const servicesEnrollVerificationSchema = new Schema({
    token: {type : String, required : true},
    email: {type : String, required : true},
    when: {type : Date, required : true},
}, {_id: false});

const servicesPasswordResetSchema = new Schema({
    token: {type : String, required : true},
    email: {type : String, required : true},
    when: {type : Date, required : true},
}, {_id: false});

const servicesLoginSchema = new Schema({
    token: {type : String, required : true},
    when: {type : Date, required : true},
    autologin : {type: Boolean, default:false, required:true}
}, {_id: false});

const servicesSchema = new Schema({
    emailVerification: {type : servicesEmailVerificationSchema},
    enrollVerification: {type : servicesEnrollVerificationSchema},
    passwordReset: {type : servicesPasswordResetSchema, required : false},
    logins : [servicesLoginSchema]
}, {_id: false});

//!SERVICES TOKEN

const credentialSchema = new Schema({
    password: {type : String, required : true},
    saltVoissa: {type : String, default : ""}
}, {_id: false});

const emailSchema = new Schema({
    address: {type :String, required : true},
    ip: {type :String, default : ""},
    date: { type: Date, default: null },
    subscriberId: {type :String},
    bounced : {type: Boolean, default: false}
}, {_id: false});

const abTestingSchema = new Schema({
    abTestingId: {type : Schema.Types.ObjectId, default : null},
    dateAt: { type: Date, default: null },
}, {_id: false});


const informationSchema = new Schema({
    birthday: Date,
    sex: {type: Number, min: 0, max: 2, default: 0}, // 0=>homme, 1=>femme
    orientation: {type: Number, min: 0, max: 3, default: 0}, // 0=>NC, 1=>hetero, 2=>bi, 3=>homo
    size: {type: Number, min: 0, max: 3, default: 0}, // 0=>NC, 1=>petite, 2=>taillemoyenne, 3=>grande
    weight: {type: Number, min: 0, max: 4, default: 0}, // 0=>NC, 1=>mince, 2=>poidsmoyen, 3=>kilosentrop, 4=>poidsfort
    eyesColor: {type: Number, min: 0, max: 6, default: 0}, // 0=>NC, 1=>noirs, 2=>marrons, 3=>noisettes, 4=>bleus, 5=>verts, 6=>gris
    hairColor: {type: Number, min: 0, max: 10, default: 0}, // 0=>NC, 1=>blancs, 2=>gris, 3=>poivreetsel, 4=>platine, 5=>blonds, 6=>chatains, 7=>roux, 8=>bruns, 9=>noirs, 10=>couleursvives
    lookStyle: {type: Number, min: 0, max: 8, default: 0}, // 0=>NC, 1=>decontracte, 2=>classique, 3=>bcbg, 4=>boheme, 5=>sportif, 6=>geek, 7=>grunge, 8=>gothique
    hairiness: {type: Number, min: 0, max: 3, default: 0}, // 0=>NC, 1=>epilationtotale, 2=>poilu, 3=>peu
    personality: [{type: Number, min: 0, max: 20}], // 0=>aventureux, 1=>conciliant, 2=>humoristique, 3=>sociable, 4=>insouciant, 5=>vif, 6=>expansif, 7=>inquiet, 8=>reserve, 9=>superstitieux, 10=>attentionne, 11=>calme, 12=>genereux, 13=>sensible, 14=>spontane, 15=>timide, 16=>exigeant, 17=>fier, 18=>possessif, 19=>solitaire, 20=>tenace
    smoker: {type: Number, min: 0, max: 3, default: 0}, // 0=>NC, 1=>Non, 2=>Oui, 3=>Occasionnellement
    sexualPosition: {type: Number, min: 0, max: 6, default: 0}, // 0=>NC, 1=>missionnaire, 2=>69, 3=>branletteespagnole, 4=>levrette, 5=>andromaque, 6=>999 (autre)
    fetishObject: {type: Number, min: 0, max: 7, default: 0}, // 0=>NC, 1=>fouet, 2=>menottes, 3=>collants, 4=>masque, 5=>portejarretelles, 6=>chaussures, 7=>999 (autre)
    partnerBodyPart: {type: Number, min: 0, max: 10, default: 0}, // 0=>NC, 1=>cheveux, 2=>yeux, 3=>bouche, 4=>poitrine, 5=>torse, 6=>dos, 7=>fesses, 8=>jambes, 9=>pieds, 10=>999 (autre) - ex otherBodyPart
    bodyPart: {type: Number, min: 0, max: 10, default: 0}, // 0=>NC, 1=>cheveux, 2=>yeux, 3=>bouche, 4=>poitrine, 5=>torse, 6=>dos, 7=>fesses, 8=>jambes, 9=>pieds, 10=>999 (autre)- ex myBodyPart
    placeToHaveFetishSex: {type: Number, min: 0, max: 7, default: 0} // 0=>NC, 1=>lit, 2=>salon, 3=>plage, 4=>nature, 5=>toilettes, 6=>lieuxinterdits, 7=>999 (autre)
});

const locationItemSchema = new Schema({
    _id: Schema.Types.Mixed,
    name: String
}, {_id: false});

const coordinateSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: [Number]
}, {_id: false});

const locationSchema = new Schema({
    country: {type: locationItemSchema, default: locationItemSchema},
    region: {type: locationItemSchema, default: locationItemSchema},
    county: {type: locationItemSchema, default: locationItemSchema},
    city: {type: locationItemSchema, default: locationItemSchema},
    coordinate: {type: coordinateSchema, default: coordinateSchema}
}, {_id: false});

const datingSchema = new Schema({
    reals: [{type: Number, min: 0, max: 2}], // 0=>serieuse, 1=>sanslendemain, 2=>amitie
    unreals: [{type: Number, min: 0, max: 3}] // 0=>chat, 1=>webcam, 2=>message, 3=>amitie
}, {_id: false});

const profileSchema = new Schema({
    // title : String, //TODO: à confirmer
    description: {type : String, default : ""},
    coverId: {type : Schema.Types.ObjectId, default : null},
    avatarId: {type : Schema.Types.ObjectId, default : null},
    cover: {type : String, default : ""},//TODO: voir id mongo
    avatar: {type : String, default : ""},//TODO: voir id mongo
    informations: [informationSchema],
    civilStatus: {type: Number, min: 0, max: 6, default: 0}, // 0=>NC, 1=>jamais (Célibataire), 2=>marie, 3=>couple, 4=>separe, 5=>divorce, 6=>veuf
    gender: {type: Number, min: 0, max: 6, default: 1}, // 0=>NC, 1=>Homme, 2=>Femme, 3=>Couple, 4=>Couple lesbien, 5=>Couple gay, 6=>Travesti -  ex lookFor
    lookingFor: [{type: Number, min: 0, max: 12}], // 0 =>non defini // 1=>femmehetero, 2=>femmelesbienne, 3=>femmebi, 4=>hommehetero, 5=>hommegay, 6=>hommebi, 7=>couplehetero, 8=>Couple homo, 9=>Couple lesbien, 10=>couplefemmeb, 11=>couplehommebi, 12=>travtrans
    //lookingFor:  0= non definis, "Femme hétéro", 1 = "Femme lesbienne", 2 = "Femme bi", 3 = "Homme hétéro", 4 = "Homme Gay", 5 = "Homme bi", 6 ="Couple hétéro", 7 = "Couple gay", 8 = "Couple lesbien", 9 = "Trav / Trans"
    tendencies: [{type: Number, min: 0, max: 9}], // 0=>fidele, 1=>voyeur, 2=>echangiste, 3=>melangiste, 4=>coteacotiste, 5=>candauliste, 6=>exhib, 7=>sm, 8=>gangbang - ex tendances
    mobility: {type: Number, min: 0, max: 3, default: 0}, // 0=>NC, 1=>recoit, 2=>sedeplace, 3=>lesdeux
    // location: {type: locationSchema, default: locationSchema},
    dating: {type: datingSchema, default: datingSchema},
    photoCertified: {type :String, default : ""},
    photoCertifiedId: {type : Schema.Types.ObjectId, default : null},
    isCompleted: {type: Boolean, default: false},
}, {_id: false});



const signatureSettingSchema = new Schema({
    display: {type: Boolean, default: false},
    content: String,
    contentRaw: {type: contentRaw, default:contentRaw},
}, {_id: false});

const commentSettingSchema = new Schema({
    allowed: {type: Boolean, default: true},
    toValidate: {type: Boolean, default: true}
}, {_id: false});

const notificationItemSettingSchema = new Schema({
    notification: {type: Boolean, default: true},
    email: {type: Boolean, default: true}
}, {_id: false});

const notificationEmailSchema = new Schema({
    visitProfile : {type: Boolean, default: true},
    requestToAddsFriend : {type: Boolean, default: true},
    requestAcceptedFriend : {type: Boolean, default: true},
    commentMyStatus : {type: Boolean, default: true},
    commentStatusReply : {type: Boolean, default: true},
    writesMyWall : {type: Boolean, default: true},
    sendsNewMessageChatMyOffline : {type: Boolean, default: true},
    commentOneOfMyMedias : {type: Boolean, default: true},
    commentOneOfMyArticles : {type: Boolean, default: true},
    commentOneOfMyTopics : {type: Boolean, default: true},
    answersATopicIveParticipatedIn : {type: Boolean, default: true},
    followPostsANewMedia : {type: Boolean, default: true},
    followPostsANewTopic : {type: Boolean, default: true},
    newsletterMembers : {type: Boolean, default: true},
    newsletterPictures : {type: Boolean, default: true},
    topicFollow : {type: Boolean, default: true},
}, {_id: false});

const notificationSiteSchema = new Schema({
    status : {type: Boolean, default: true},
    requestToAddsFriend : {type: Boolean, default: true},
    requestAcceptedFriend : {type: Boolean, default: true},
    commentCitation : {type: Boolean, default: true},
    comment : {type: Boolean, default: true},
    like : {type: Boolean, default: true},
    topicFollow : {type: Boolean, default: true},
}, {_id: false});

const settingSchema = new Schema({
    //newsletter: {type: Boolean, default: false},
    signature: {type: signatureSettingSchema, default: signatureSettingSchema},
    comment: {type: commentSettingSchema, default: commentSettingSchema},
    // notification: {type: notificationEmailSchema, default: notificationEmailSchema},
    displayFriends: {type: Boolean, default: true},
    displayLastVisitors: {type: Boolean, default: true},
    appearInDating: {type: Boolean, default: false},// ex statusAnnounce
    friendRequestQuestions: {type: Boolean, default: true},
    chatWithOnlyWithFriends: {type: Boolean, default: false},
    notDisplaySignatureInForum: {type: Boolean, default: false},
    notDisplayOrientationInProfile: {type: Boolean, default: false},
    displayBigPlan: {type: Boolean, default: false},
    autoFollowTopicWhereIParticipated: {type: Boolean, default: true},
    // hidden : {type:Boolean, default:false}, //TODO: à confirmer
}, {_id: false});

const customerIdInfosSchema = new Schema({
    live : {type: String, default: ""},
    test : {type: String, default: ""}
}, {_id: false});

const customerIdSchema = new Schema({
    default : {type: customerIdInfosSchema, default: customerIdInfosSchema},
}, {_id: false});

const customerSchema = new Schema({
    subscribed: {type: Boolean, default: false},
    history: {type: Boolean, default: false}, //ex myVoissaAccess
    aboDateEnd : { type: Date, default: null },
    customerId : {type: customerIdSchema, default: customerIdSchema},
}, {_id: false});

const bannedSchema = new Schema({
    reason : {type : String, default : ""},
    roleBefore : {type : String, default : ""},
    date: { type: Date, default: null },
}, {_id: false});

const countSchema = new Schema({
    view: {type: Number, default: 0},
    comment: {type: Number, default: 0},
    photo: {type: Number, default: 0},
    video: {type: Number, default: 0},
    like: {type: Number, default: 0},
    article : {type: Number, default: 0},
}, {_id: false});

const countBlogSchema = new Schema({
    view: {type: Number, default: 0},
    article: {type: Number, default: 0},
    like: {type: Number, default: 0},
}, {_id: false});

const followSchema = new Schema({
    albums: [Schema.Types.ObjectId], //TODO: voir id mongo
    blogs: [Schema.Types.ObjectId],
    forums: [Schema.Types.ObjectId],
    topics: [Schema.Types.ObjectId],
    profiles: [Schema.Types.ObjectId]
}, { _id: false});


const questionsSchema = new Schema({
    general: [{type : Schema.Types.ObjectId, ref : "Question"}],
    facondetre: [{type : Schema.Types.ObjectId, ref : "Question"}],
    vousetmoi: [{type : Schema.Types.ObjectId, ref : "Question"}],
    couple: [{type : Schema.Types.ObjectId, ref : "Question"}],
    femme: [{type : Schema.Types.ObjectId, ref : "Question"}],
    homme: [{type : Schema.Types.ObjectId, ref : "Question"}]
}, {_id: false});

const warningRestrictionSchema = new Schema({
    startedAt: {type: Date, default: Date.now},
    endedAt: {type: Date, default: Date.now},
    isBanned: {type: Boolean, default: false}
}, {_id: false});

const warningSchema = new Schema({
    count: {type: Number, default: false},
    updatedAt: {type: Date, default: Date.now},
    isRead: {type: Boolean, default: false},
    restrictions: [warningRestrictionSchema]
}, {_id: false});

const tagModerationRightsSchema = new Schema({
    qualification: {type: Boolean, default: false},
    verification: {type: Boolean, default: false},
    treatmentVideo: {type: Boolean, default: false},
}, {_id: false});
/*
const forbiddenActionSchema = new Schema({
    createMedia: {type: Boolean, default: false},
}, {_id: false});*/

const blogSchema = new Schema({
    count : { type : countBlogSchema, default : countBlogSchema}
});

const certifiedSchema = new Schema({
    isCertified : { type : Boolean, default : false},
    dateAt : { type : Date, default : Date.now}
});

const userSchema = new Schema({
    blog : blogSchema, // voir si on garde avec la ligne en dessous
    blogName: {type: String, default: ''}, // voir si on garde
    usernameEphemia: {type : String, default : ""}, // voir si on garde
    username: {type : String, required : true, unique:true}, // le pseudo du membre afficher
    login : {type : String, required : true}, // username en lowercase avec espace
    slug: {type : String, required : true}, // username sans espace n'y accents et en lowercase
    role: {type: String, default: 'emailUnconfirmed', enum: ["administrator", "moderator", "standard", "emailUnconfirmed", "banned"]},// role du membre en string


    online: {type: Boolean, default: false},
    lastActivity: {type: Date, default: Date.now}, // a voir avec greg si on conserve celui ci plus lastVisit
    lastVisit: {type: Date, default: Date.now},


    isIndexed : {type: Boolean, default: false},
    deleteAccountDate: {type: Date, default: null},

    ip: {type :String, default : ""},
    isocodeIp: {type :String, default : ""},
    isRisk : {type: Boolean, default: false},
    isSpammer :  {type: Number, min: 0, max: 2, default: 0}, // 0 = non confirme, 1 = confirmer spam, 2 = faux positif
    isConfirmedPanicMode : {type: Boolean, default: true},
    source : {type :String, default : ""},

    abTestings : [abTestingSchema],
    usersIgnored: [Schema.Types.ObjectId],
    certified : {type : certifiedSchema, default : certifiedSchema},
    credentials: {type: credentialSchema, default: credentialSchema},
    email: {type: emailSchema, default: emailSchema},
    profile: {type: profileSchema, default: profileSchema},
    setting: {type: settingSchema, default: settingSchema},
    customer: {type: customerSchema, default: customerSchema},
    count: {type: countSchema, default: countSchema},
    follow: {type: followSchema, default: followSchema},
    banned : {type : bannedSchema, default : bannedSchema},
    tagModerationRights : {type : tagModerationRightsSchema, default : tagModerationRightsSchema},
    location: {type: locationSchema, default: locationSchema},
    oldId : {type: Schema.Types.Mixed}, // on le garde ?
    services: {type: servicesSchema, default: servicesSchema},
    notificationEmail: {type: notificationEmailSchema, default: notificationEmailSchema},
    notificationSite: {type: notificationSiteSchema, default: notificationSiteSchema},
    warning: {type: warningSchema, default: warningSchema},
}, {
    id :false,
    timestamps: true,
    strict: true
});


module.exports = userSchema;
