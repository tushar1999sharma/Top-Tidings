const User      = require('../models/userModel');
const News      = require('../models/newsModel');

module.exports = {
    addBookmark: async (req, res) => {
        console.log(req);
        try {
            //create news 
            const news = await News.create(req.body);
            console.log("create news to bookmark news", news);
            //find user who bookmarked news
            const user = await User.findById(req.user._id);
            console.log("Find user to bookmark news", user);
            //push bookmarked news into user
            user.bookmark.push(news._id);
            await user.save();
            console.log("User after adding news to bookmark ", user);
            //now return result
            return res.json({
                status: 200,
                message: "successfully bookmarked news"
            })
        } 
        catch (err) {
            return res.json({
                status: 404,
                message: "something went wrong",
                error: err
            })
        }
    },

    delBookmark: async (req, res) => {
        //USE IRL TO DELETE
        try {
            //find news 
            await News.findByIdAndRemove(req.params.news_id);
            
            try {
                //find user
                const user = await User.findById(req.user._id);
                console.log("User for which u want to remove bookmark ", user);
                //update user

                return res.json({
                    status: 200,
                    message: "successfully removed bookmarked news"
                })
            } 
            catch (err) {
                return res.json({
                    status: 404,
                    message: "can't update user on deleting bookmark",
                    error: err
                })
            }    
        } 
        catch (err) {
            return res.json({
                status: 404,
                message: "You had not bookmarked this news",
                error: err
            })
        }
    }
}